import React, { useState, useEffect, useRef } from 'react'
import { View, Alert, StatusBar, SafeAreaView, AppState } from 'react-native'
import { useSelector } from 'react-redux'
import { useTheme, useTranslations } from '../../core/dopebase'
import { updateUser } from '../../core/users'
import { useIsFocused } from '@react-navigation/native'
import ActivityModal from '../../components/ActivityModal'
import Deck from '../../components/swipe/deck'
import NoMoreCard from '../../components/swipe/no_more_card'
import NewMatch from '../../components/swipe/newMatch'
import AtelierLogo from '../../components/AtelierLogo/AtelierLogo'
import { SwipeTracker } from '../../api'
import dynamicStyles from './styles'
import { useIap } from '../../core/inAppPurchase/context'
import { getUserAwareCanUndoAsync } from '../../utils'
import { useConfig } from '../../config'

const HomeScreen = props => {
  const config = useConfig()
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const isFocused = useIsFocused()

  const { setSubscriptionVisible } = useIap()
  const user = useSelector(state => state.auth.user)
  const isPlanActive = useSelector(state => state.inAppPurchase.isPlanActive)

  const [matches, setMatches] = useState([])
  const [recommendations, setRecommendations] = useState([])

  const [showMode, setShowMode] = useState(0)
  const [currentMatchData, setCurrentMatchData] = useState()
  const [appState, setAppState] = useState(AppState.currentState)
  const [
    hasConsumedRecommendationsStream,
    setHasConsumedRecommendationsStream,
  ] = useState(false)
  const [canUserSwipe, setCanUserSwipe] = useState(false)
  const [isComputing, setIsComputing] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

  const userAwareCanUndo = useRef(false)
  const isLoadingRecommendations = useRef(false)
  const swipeCountDetail = useRef({})
  const swipeTracker = useRef(null)
  const defaultMatchIndex = useRef(0).current

  useEffect(() => {
    swipeTracker.current = new SwipeTracker(user.id)
    StatusBar.setHidden(false)
    swipeTracker.current.subscribeComputingStatus(onComputingStatusUpdate)
    swipeTracker.current.subscribeMatchesNotSeen(onMatchesNotSeenUpdate)

    const subscription = AppState.addEventListener('change', handleAppStateChange)

    handleShouldFetchRecommendations()
    getUserSwipeCount()

    return () => {
      swipeTracker.current.unsubscribe()
      subscription.remove()
    }
  }, [])


  useEffect(() => {
    if (!currentMatchData && matches?.length && isFocused) {
      const unseenMatch = matches[defaultMatchIndex]
      setCurrentMatchData(unseenMatch)
    }
  }, [matches?.length, isFocused])

  useEffect(() => {
    if (currentMatchData === null) {
      const seenMatch = matches[defaultMatchIndex] || {}
      setMatches(prevMatches => {
        return prevMatches.filter(prevMatch => prevMatch.id !== seenMatch?.id)
      })
    }
  }, [currentMatchData])

  useEffect(() => {
    if (currentMatchData) {
      setShowMode(2)
      swipeTracker.current?.markMatchAsSeen(user.id, currentMatchData.id)
    }
  }, [currentMatchData])

  useEffect(() => {
    if (isComputing === false && isLoading) {
      getMoreRecommendations()
    }
  }, [isComputing])

  useEffect(() => {
    isLoadingRecommendations.current = false
    setHasConsumedRecommendationsStream(false)
    setIsLoading(true)
    setRecommendations([])
  }, [user?.settings?.distance_radius, user?.settings?.gender_preference])

  const handleShouldFetchRecommendations = async () => {
    setIsComputing(true)
    const didTrigger =
      await swipeTracker.current.triggerComputeRecommendationsIfNeeded(user)

    if (!didTrigger) {
      getMoreRecommendations()
    }
  }

  const onComputingStatusUpdate = ({ isComputingRecommendation }) => {
    if (isComputingRecommendation === undefined) {
      return
    }
    setIsComputing(isComputingRecommendation)
    if (isComputingRecommendation) {
      setIsLoading(true)
      setRecommendations([])
    }
  }

  const onMatchesNotSeenUpdate = data => {
    if (data?.length > 0) {
      setMatches(prevMatches => [...prevMatches, ...data])
    }
  }

  const getUserSwipeCount = async () => {
    const userID = user.id || user.userID

    const swipeCountInfo = await swipeTracker.current.getUserSwipeCount(userID)

    if (swipeCountInfo) {
      swipeCountDetail.current = swipeCountInfo
    } else {
      resetSwipeCountDetail()
    }

    getCanUserSwipe(false)
  }

  const resetSwipeCountDetail = () => {
    swipeCountDetail.current = {
      count: 0,
      createdAt: {
        seconds: Date.now() / 1000,
      },
    }
  }

  const updateSwipeCountDetail = () => {
    const userID = user.id

    swipeTracker.current.updateUserSwipeCount(
      userID,
      swipeCountDetail.current.count,
    )
  }

  const getSwipeTimeDifference = swipeCountDetail => {
    let now = +new Date()
    let createdAt = +new Date()

    if (swipeCountDetail?.createdAt?.seconds) {
      createdAt = +new Date(swipeCountDetail.createdAt.seconds * 1000)
    }

    return now - createdAt
  }

  const getCanUserSwipe = (shouldUpdate = true) => {
    if (isPlanActive) {
      setCanUserSwipe(true)

      return true
    }

    const oneDay = 60 * 60 * 24 * 1000

    const swipeTimeDifference = getSwipeTimeDifference(swipeCountDetail.current)

    if (swipeTimeDifference > oneDay) {
      resetSwipeCountDetail()
      updateSwipeCountDetail()

      setCanUserSwipe(true)

      return true
    }

    if (
      swipeTimeDifference < oneDay &&
      swipeCountDetail.current.count < config.dailySwipeLimit
    ) {
      if (shouldUpdate) {
        swipeCountDetail.current.count += 1
        updateSwipeCountDetail()
      }

      setCanUserSwipe(
        swipeCountDetail.current.count + 1 <= config.dailySwipeLimit,
      )

      return true
    }

    if (
      swipeTimeDifference < oneDay &&
      swipeCountDetail.current.count >= config.dailySwipeLimit
    ) {
      setCanUserSwipe(false)

      return false
    }
  }

  const handleAppStateChange = nextAppState => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      updateUser(user.id, { isOnline: true })
        .then(() => {
          setAppState(nextAppState)
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      updateUser(user.id, { isOnline: false })
        .then(() => {
          setAppState(nextAppState)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  const handleNewMatchButtonTap = nextScreen => {
    setShowMode(0)
    setCurrentMatchData(null)
    if (nextScreen) {
      props.navigation.navigate(nextScreen)
    }
  }

  const getMoreRecommendations = async () => {
    if (isLoadingRecommendations.current || hasConsumedRecommendationsStream) {
      return
    }

    setIsLoading(true)

    isLoadingRecommendations.current = true

    const data = await swipeTracker.current.fetchRecommendations(user)
    isLoadingRecommendations.current = false

    if (data?.length) {
      setRecommendations(data)
    }
    setIsLoading(false)
    setIsComputing(false)

    if (data?.length === 0) {
      setHasConsumedRecommendationsStream(true)
      return
    }

    if (!data) {
      Alert.alert(localized('Error'), localized("Couldn't load cards"))
    }
  }

  const addToMatches = matchedUser => {
    setMatches(prevMatches => {
      const newMatches = [...prevMatches]
      const index = prevMatches.findIndex(
        prevMatch => prevMatch.id === matchedUser.id,
      )
      if (index < 0) {
        newMatches.push(matchedUser)
      }
      return newMatches
    })
  }

  const undoSwipe = swipedUserToUndo => {
    if (!swipedUserToUndo) {
      return
    }

    const userID = user.id || user.userID

    swipeTracker.current.undoSwipe(swipedUserToUndo, userID)
  }

  const onSwipe = async (type, swipeItem) => {
    const canSwipe = getCanUserSwipe()

    if (!canSwipe) {
      return
    }

    if (swipeItem && canSwipe) {
      const matchedUser = await swipeTracker.current.addSwipe(
        user,
        swipeItem,
        type,
      )

      if (matchedUser) {
        addToMatches(matchedUser)
      }

      if (!userAwareCanUndo.current && type === 'dislike' && !isPlanActive) {
        shouldAlertCanUndo()
      }
    }
  }

  const onAllCardsSwiped = () => {
    setRecommendations([])
    getMoreRecommendations()
  }

  const shouldAlertCanUndo = async () => {
    const isUserAware = await getUserAwareCanUndoAsync()

    if (isUserAware) {
      userAwareCanUndo.current = true

      return
    }

    Alert.alert(
      localized('Pardon the interruption'),
      localized(
        "Don't lose this amazing friend just because you accidentally swiped left. Upgrade your account now to see them again.",
      ),
      [
        {
          text: localized('Upgrade Now'),
          onPress: () => setSubscriptionVisible(true),
        },
        {
          text: localized('Cancel'),
        },
      ],
      { cancelable: true },
    )
    userAwareCanUndo.current = true
  }

  const renderEmptyState = () => {
    return <NoMoreCard user={user} />
  }

  const renderNewMatch = () => {
    return (
      <NewMatch
        url={currentMatchData?.profilePictureURL}
        onSendMessage={() => handleNewMatchButtonTap('Matches')}
        onKeepSwiping={() => handleNewMatchButtonTap(null)}
      />
    )
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.container}>
          <AtelierLogo />
          {(recommendations.length > 0 || hasConsumedRecommendationsStream) && (
            <Deck
              data={recommendations}
              setShowMode={setShowMode}
              onUndoSwipe={undoSwipe}
              onSwipe={onSwipe}
              showMode={showMode}
              onAllCardsSwiped={onAllCardsSwiped}
              isPlanActive={isPlanActive}
              setSubscriptionVisible={setSubscriptionVisible}
              renderEmptyState={renderEmptyState}
              renderNewMatch={renderNewMatch}
              canUserSwipe={canUserSwipe}
            />
          )}

          <ActivityModal
            loading={
              isFocused &&
              (isComputing || isLoading) &&
              !hasConsumedRecommendationsStream
            }
            title={localized('Please wait')}
            size={'large'}
            activityColor={'white'}
            titleColor={'white'}
            activityWrapperStyle={{
              backgroundColor: '#404040',
            }}
          />
        </View>
      </SafeAreaView>
    </View>
  )
}

//'https://pbs.twimg.com/profile_images/681369932207013888/CHESpTzF.jpg'

export default HomeScreen
