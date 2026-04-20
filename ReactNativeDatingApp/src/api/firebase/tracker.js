import * as firebaseSwipe from './swipes'

export default class SwipeTracker {
  constructor(userID) {
    this.userID = userID
  }

  unsubscribe = () => {
    if (this.unsubscribeComputingStatus) {
      this.unsubscribeComputingStatus()
    }
    if (this.unsubscribeMatches) {
      this.unsubscribeMatches()
    }
    if (this.unsubscribeMatchesNotSeen) {
      this.unsubscribeMatchesNotSeen()
    }
  }

  subscribeMatches = callback => {
    if (!this.userID || !callback) {
      return
    }
    this.unsubscribeMatches = firebaseSwipe.subscribeMatches(
      this.userID,
      callback,
    )
  }

  subscribeComputingStatus = callback => {
    if (!this.userID || !callback) {
      return
    }
    this.unsubscribeComputingStatus = firebaseSwipe.subscribeComputingStatus(
      this.userID,
      callback,
    )
  }

  subscribeMatchesNotSeen = callback => {
    if (!this.userID || !callback) {
      return
    }
    this.unsubscribeMatchesNotSeen = firebaseSwipe.subscribeMatchesNotSeen(
      this.userID,
      callback,
    )
  }

  triggerComputeRecommendationsIfNeeded = async user => {
    return firebaseSwipe.triggerComputeRecommendationsIfNeeded(user)
  }

  fetchRecommendations = async user => {
    return firebaseSwipe.fetchRecommendations(user)
  }

  undoSwipe = (swipedUserToUndo, authorUserID) => {
    if (!swipedUserToUndo || !authorUserID) {
      return
    }
    return firebaseSwipe.undoSwipe(swipedUserToUndo, authorUserID)
  }

  addSwipe = async (fromUser, toUser, type) => {
    return firebaseSwipe.addSwipe(fromUser, toUser, type)
  }

  markMatchAsSeen = async (userId, matchedUserID) => {
    return firebaseSwipe.markMatchAsSeen(userId, matchedUserID)
  }

  getUserSwipeCount = async userID => {
    return firebaseSwipe.getUserSwipeCount(userID)
  }

  updateUserSwipeCount = async (userID, count) => {
    return firebaseSwipe.updateUserSwipeCount(userID, count)
  }
}
