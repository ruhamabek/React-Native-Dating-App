import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import { useTheme, useTranslations } from '../../core/dopebase'
import CardDetailsView from '../../components/swipe/CardDetailsView/CardDetailsView'
import ConversationsHomeComponent from './ConversationsHomeComponent'
import { SwipeTracker } from '../../api/'

const ConversationsScreen = props => {
  const currentUser = useSelector(state => state.auth.user)
  const { theme, appearance } = useTheme()
  const colors = theme.colors[appearance]

  const [matches, setMatches] = useState([])

  const { localized } = useTranslations()

  const [selectedUser, setSelectedUser] = useState({})
  const [isUserProfileDetailVisible, setIsUserProfileDetailVisible] =
    useState(false)

  const swipeTracker = useRef(null)

  useEffect(() => {
    swipeTracker.current = new SwipeTracker(currentUser?.id)
    swipeTracker.current.subscribeMatches(onMatchesUpdate)
  }, [])

  const onMatchesUpdate = data => {
    setMatches(data)
  }

  const renderCardDetailModal = () => {
    const {
      profilePictureURL,
      firstName,
      lastName,
      age,
      school,
      distance,
      bio,
      photos,
    } = selectedUser

    return (
      <CardDetailsView
        profilePictureURL={profilePictureURL}
        firstName={firstName}
        lastName={lastName}
        age={age}
        school={school}
        distance={distance}
        bio={bio}
        instagramPhotos={photos ? photos : []}
        setShowMode={() => setIsUserProfileDetailVisible(false)}
      />
    )
  }

  const onEmptyStatePress = () => {
    props.navigation.navigate('Swipe')
  }

  const onMatchUserItemPress = otherUser => {
    const id1 = currentUser.id || currentUser.userID
    const id2 = otherUser.id || otherUser.userID
    const channel = {
      id: id1 < id2 ? id1 + id2 : id2 + id1,
      participants: [otherUser],
    }
    props.navigation.navigate('PersonalChat', { channel })
  }

  const emptyStateConfig = {
    title: localized('No Conversations'),
    description: localized(
      'Start chatting with the people you matched. Your conversations will show up here.',
    ),
    callToAction: localized('Start swiping'),
    onPress: onEmptyStatePress,
  }

  return (
    <ConversationsHomeComponent
      matches={matches}
      onMatchUserItemPress={onMatchUserItemPress}
      navigation={props.navigation}
      emptyStateConfig={emptyStateConfig}
    />
  )
}

export default ConversationsScreen
