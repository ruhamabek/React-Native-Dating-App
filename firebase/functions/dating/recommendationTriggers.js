const functions = require('firebase-functions')
const admin = require('firebase-admin')
const geofirestore = require('geofirestore')
const {
  generateDistanceField,
  getUserSettingsDistanceRadius,
  getUserSettingsChanged,
  getCanComputeRecommendations,
  getDistanceString,
  defaultUserSettings,
} = require('./utils')

const batchFetchLimit = 200
const minBatchAllowed = 15

const defaultAvatar =
  'https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg'

// admin.initializeApp();
const firestore = admin.firestore
const db = admin.firestore()
const geoDB = geofirestore.initializeApp(db)

/*
 ** When a user updates their profile info (profile picture, first name, settings, etc)
 ** We compute recommendations base on all valid fields updated
 */
exports.onUserDataWrite = functions.firestore
  .document('users/{userID}')
  .onWrite(async (change, context) => {
    const prevUserData = change.before.data()
    const newUserData = change.after.data()
    if (
      !change.after.exists ||
      !newUserData ||
      newUserData.location.latitude === undefined
    ) {
      console.log('+++compute recommendations not allowed')
      return null
    }

    const { hasComputedRcommendations } = newUserData

    const userSettingsChanged = getUserSettingsChanged(
      prevUserData,
      newUserData,
    )

    console.log('++++hasComputedRcommendations++++' + hasComputedRcommendations)

    console.log('++++userSettingsChanged++++' + userSettingsChanged)

    // if user  settings changed, and we have already computed recommendations
    // we should compute new recommendations base on the new settings
    if (hasComputedRcommendations && userSettingsChanged) {
      return handleUserRecommendations(newUserData, change.after.ref)
    }

    //We check to ensure all required fields are available before computing recommendations
    const canComputeRecommendations = getCanComputeRecommendations(newUserData)

    console.log('++++canComputeRecommendations++++' + canComputeRecommendations)

    if (!canComputeRecommendations) {
      return null
    }

    const coordinatesIsEqual = new firestore.GeoPoint(
      newUserData.location.latitude,
      newUserData.location.longitude,
    ).isEqual(newUserData.coordinates)

    // if user has no geopoint hash or user coordinates is not equal, that is, user coordinates did changed,
    // we update geopoint hash for user. Geopoint hash is needed to use geoQuery from geofirestore
    if (!newUserData.g || !coordinatesIsEqual) {
      return geoDB
        .collection('users')
        .doc(newUserData.id)
        .update({
          coordinates: new firestore.GeoPoint(
            newUserData.location.latitude,
            newUserData.location.longitude,
          ),
        })
    }

    if (!newUserData.settings) {
      change.after.ref.update({
        settings: defaultUserSettings,
      })
      return null
    }

    //If we haven't previously computed recommendations or hasComputedRcommendations is false for unknown reason,
    // then we compute new recommendations
    if (!hasComputedRcommendations) {
      return handleUserRecommendations(newUserData, change.after.ref)
    }

    return null
  })

/*
 ** When a user dating recommendations collection is updated and collection size is 15, we compute add new recommendations
 **
 */
exports.onUserRecommendationsUpdate = functions.firestore
  .document(
    'dating_recommendations/{userID}/recommendations/{recommendationID}',
  )
  .onDelete(async (change, context) => {
    const userID = context.params.userID

    if (typeof userID !== 'string') {
      return null
    }

    const computedRecommendationsRef = db
      .collection('dating_recommendations')
      .doc(userID)
      .collection('recommendations')
    const userRef = db.collection('users').doc(userID)

    try {
      const userSnapshot = await userRef.get()
      const user = userSnapshot.data()

      if (!userSnapshot.exists) {
        return null
      }

      const computedRecommendationsSnapshot =
        await computedRecommendationsRef.get()

      if (computedRecommendationsSnapshot.size <= minBatchAllowed) {
        return handleUserRecommendations(user, userRef, false)
      }
      return null
    } catch (error) {
      console.log('updateUserRecommendations', error)
    }
  })

// we compute new recommendations for the user and
//  and update the user object with the currentRecommendationSize,  hasComputedRcommendations and settings.
const handleUserRecommendations = async (user, userRef, updateIsComputing) => {
  const recommendations = await computeNewRecommendations(
    user,
    updateIsComputing,
  )

  if (recommendations) {
    const dataToUpdate = {
      hasComputedRcommendations: true,
      currentRecommendationSize: recommendations.length,
    }
    if (!user.settings) {
      dataToUpdate.settings = defaultUserSettings
    }

    return userRef.update(dataToUpdate)
  }
}

const computeNewRecommendations = async (user, updateIsComputing = true) => {
  try {
    const batch = firestore().batch()

    // first we wipe out all old recommendations before computing new recommendations
    const myRecommendationsSnapshot = await wipeOutAllOldRecommendations(
      batch,
      user.id,
      updateIsComputing,
    )

    // get all swipes to be used to filter recommendations
    const swipes = await getAllSwipes(user)

    // fetch new compatible users base on user settings and location
    let recommendations = await fetchRecommendations(user, swipes)

    // write new dating recommendations collection with newly fetched users
    recommendations = writeNewRecommendations(
      batch,
      user.id,
      recommendations,
      myRecommendationsSnapshot,
    )

    console.log(
      '+++total rec for:' + user.email + 'is' + recommendations.length,
    )

    await batch.commit()

    // set isComputingRecommendation to false in order to tell client side that the recommendations
    // are ready to be fetched
    myRecommendationsSnapshot.ref.update(
      { isComputingRecommendation: false },
      { merge: true },
    )

    return recommendations
  } catch (error) {
    console.log('+++++ computeNewRecommendations error', error)
  }
}

//we wipe out all existing recommedations in the "dating_recommendations" collection for a particular user.
const wipeOutAllOldRecommendations = async (
  batch,
  myUserID,
  updateIsComputing,
) => {
  const recommendationsRef = firestore().collection('dating_recommendations')
  const myRecommendationsSnapshot = await recommendationsRef.doc(myUserID).get()
  const computedRecommendationsRef =
    myRecommendationsSnapshot.ref.collection('recommendations')
  const computedRecommendationsSnapshot = await computedRecommendationsRef.get()

  if (updateIsComputing) {
    myRecommendationsSnapshot.ref.set(
      { isComputingRecommendation: true },
      { merge: true },
    )
  }

  if (!computedRecommendationsSnapshot.empty) {
    computedRecommendationsSnapshot.docs.forEach(doc => batch.delete(doc.ref))
  }

  return myRecommendationsSnapshot
}

const generateCompatibleUsersQuery = (user, mostRecentDoc) => {
  const userSettings = user.settings || defaultUserSettings
  const myGenderPre = userSettings.gender_preference || 'all'

  let query = db
    .collection('users')
    .where('settings.show_me', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(batchFetchLimit)

  console.log('++ myGenderPre ++' + myGenderPre)

  if (myGenderPre !== 'all') {
    query = query.where('settings.gender', '==', myGenderPre)
  }

  if (mostRecentDoc) {
    query = query.startAfter(mostRecentDoc)
  }

  return query
}

const generateGeoProximityUsersQuery = (user, distanceRadius) => {
  const userSettings = user.settings || defaultUserSettings
  const myLocation = user.location
  const myGenderPre = userSettings.gender_preference || 'all'
  const distanceRadiusToKM = Number(distanceRadius) * 1.609344 // we convert to kilometers since geofirestore expects kilometers

  let query = geoDB
    .collection('users')
    .near({
      center: new firestore.GeoPoint(myLocation.latitude, myLocation.longitude),
      radius: distanceRadiusToKM, //kilometers
    })
    .where('settings.show_me', '==', true)

  console.log('++ myGenderPre ++' + myGenderPre)

  if (myGenderPre !== 'all') {
    query = query.where('settings.gender', '==', myGenderPre)
  }
  return query
}

const filterOutUsersBySwipeHistory = (compatibleUsersDocs, swipes) => {
  return compatibleUsersDocs.filter(doc => !swipes[doc.id])
}

const writeNewRecommendations = (
  batch,
  myUserID,
  recommendations,
  myRecommendationsSnapshot,
) => {
  const computedRecommendationsRef =
    myRecommendationsSnapshot.ref.collection('recommendations')
  let myIndex = -1

  recommendations.forEach((recommendation, index) => {
    if (recommendation.id === myUserID) {
      myIndex = index
    } else {
      batch.set(
        computedRecommendationsRef.doc(recommendation.id),
        recommendation,
      )
    }
  })

  if (myIndex > -1) {
    recommendations.splice(myIndex, 1)
  }

  return recommendations
}

const getAllSwipes = async user => {
  let swipes = {}
  const likesRef = db.collection('swipes').doc(user.id).collection('likes')
  const dislikesRef = db
    .collection('swipes')
    .doc(user.id)
    .collection('dislikes')
  const likesSnapshot = await likesRef.get()
  const dislikesSnapshot = await dislikesRef.get()

  const formatSwipes = snapshot =>
    snapshot.docs.forEach(doc => {
      if (!doc.exists) {
        return
      }
      const data = doc.data()
      swipes = Object.assign(swipes, { [data.swipedProfileID]: data.type })
    })

  formatSwipes(likesSnapshot)
  formatSwipes(dislikesSnapshot)

  return swipes
}

const fetchRecommendations = async (user, swipes) => {
  const distanceRadius = getUserSettingsDistanceRadius(user)

  // If the user specified an unlimited distance radius, then we fetch recommendations without
  // without worrying about a distance radius.
  if (distanceRadius === 'unlimited') {
    return fetchUnlimitedDistanceRecommendations(user, swipes)
  }

  //The user has specified a distance radius, then we use the distance radius to fetch recommendations
  return fetchGeoProximityRecommendations(user, swipes, distanceRadius)
}

const fetchGeoProximityRecommendations = async (
  user,
  swipes,
  distanceRadius,
) => {
  //we generate a query base on users settings and location
  const query = generateGeoProximityUsersQuery(user, distanceRadius)

  const compatibleUsersSnapshot = await query.get()

  if (compatibleUsersSnapshot.empty) {
    return []
  }

  const compatibleUsersDocs = filterOutUsersBySwipeHistory(
    compatibleUsersSnapshot.docs,
    swipes,
  )

  return compatibleUsersDocs.map(doc =>
    Object.assign(doc.data(), {
      distance: getDistanceString(doc.distance / 1.609344), // convert distance to miles
    }),
  )
}

// we fetch compatible recommendations, we run a while loop to batch fetch recommendations until we have sufficient result size
const fetchUnlimitedDistanceRecommendations = async (user, swipes) => {
  const myLocation = user.location
  let hasConsumedRecommendationsStream = false
  let recommendations = []
  let mostRecentDoc

  while (
    recommendations.length < batchFetchLimit &&
    !hasConsumedRecommendationsStream
  ) {
    //we generate a query base on users settings and
    //most recent doc for pagination
    const query = generateCompatibleUsersQuery(user, mostRecentDoc)

    let compatibleUsersSnapshot = await query.get()

    if (compatibleUsersSnapshot.empty) {
      hasConsumedRecommendationsStream = true
    }

    mostRecentDoc =
      compatibleUsersSnapshot.docs[compatibleUsersSnapshot.docs.length - 1]

    const compatibleUsersDocs = filterOutUsersBySwipeHistory(
      compatibleUsersSnapshot.docs,
      swipes,
    )

    const newRecommendations = compatibleUsersDocs.map(doc => {
      const userX = doc.data()
      const userXLocation = userX.location

      return Object.assign(userX, {
        distance: generateDistanceField(
          userXLocation.latitude,
          userXLocation.longitude,
          myLocation.latitude,
          myLocation.longitude,
        ),
      })
    })

    recommendations = recommendations.concat(newRecommendations)
  }

  return recommendations
}
