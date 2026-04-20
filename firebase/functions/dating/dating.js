const functions = require('firebase-functions')
const admin = require('firebase-admin')
const collectionsUtils = require('../core/collections')
const { add, getList } = collectionsUtils
const { sendPushNotification } = require('../notifications/utils')

const db = admin.firestore()

const usersRef = db.collection('users')
const swipesRef = db.collection('swipes')
const matchesRef = db.collection('matches')
const datingRecommendationsRef = db.collection('dating_recommendations')

const checkIfMatchExist = async swipe => {
  const { swipedProfileID, authorID, type } = swipe
  const otherUserSwipeSnapshot = await swipesRef
    .doc(swipedProfileID)
    .collection(`${type}s`)
    .doc(authorID)
    .get()
  if (!otherUserSwipeSnapshot.exists) {
    return false
  }
  const otherUserSwipe = otherUserSwipeSnapshot.data()

  return otherUserSwipe.type === type
}

/*
 ** This is called when author swipes the matchedUser, and there's new match
 */
const didDetectNewMatch = async (author, matchedUser) => {
  if (!author || !matchedUser) {
    return
  }
  // add matched user to author's matches collection
  await add(matchesRef.doc(author.id), 'my_matches', {
    hasBeenSeen: true,
    match: matchedUser,
    id: matchedUser.id,
  })

  // add author to matched user's matches collection
  await add(matchesRef.doc(matchedUser.id), 'my_matches', {
    hasBeenSeen: false,
    match: author,
    id: author.id,
  })

  // Send push notification to matched user, with the new match data
  await sendPushNotification(
    matchedUser.id,
    'New match!',
    'You just got a new match!',
    'dating_match',
    { fromUser: author },
  )
}

const persistSwipe = swipe => {
  const mySwipeRef = swipesRef.doc(swipe.authorID)
  return mySwipeRef
    .collection(`${swipe.type}s`)
    .doc(swipe.swipedProfileID)
    .set(swipe)
}

const fetchUserData = async userID => {
  const userSnapshot = await usersRef.doc(userID).get()
  return userSnapshot.data()
}

/*
Removes the swiped card from author's recommendations collection
*/
const removeRecommendationDoc = async (swipedProfileID, authorID) => {
  await datingRecommendationsRef
    .doc(authorID)
    .collection('recommendations')
    .doc(swipedProfileID)
    .delete()
}

/*
 ** Function to be called when a user swipes another user
 ** Returns a promise that resolves to the swiped user data (destination user)
 */
exports.addUserSwipe = functions.https.onCall(async (data, context) => {
  const { swipedProfileID, authorID, type } = data

  let matchedUserData = null

  await removeRecommendationDoc(swipedProfileID, authorID)

  try {
    if (type === 'like' || type === 'superlike') {
      const ifMatchExist = await checkIfMatchExist(data)

      if (ifMatchExist) {
        const author = await fetchUserData(authorID)
        matchedUserData = await fetchUserData(swipedProfileID)
        didDetectNewMatch(author, matchedUserData)
      }
    }

    persistSwipe(data)
    return matchedUserData
  } catch (error) {
    console.log('\n\n addUserSwipe: ', error)
    return matchedUserData
  }
})

exports.fetchMatches = functions.https.onCall(async (data, context) => {
  const { userID, page, size } = data
  console.log(`fetching matches `)
  console.log(JSON.stringify(data))
  const matches = await getList(
    matchesRef.doc(userID),
    'my_matches',
    page,
    size,
  )
  if (matches?.length > 0) {
    console.log(`fetched matches: `)
    console.log(JSON.stringify(matches))
    return { matches: matches, success: true }
  } else {
    return { matches: [], success: true }
  }
})
