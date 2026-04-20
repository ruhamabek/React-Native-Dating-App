import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Image } from 'expo-image'
import { useTheme } from '../core/dopebase'
import { firebase } from '../core/api/firebase/config'

const AvatorView = props => {
  const { theme, appearance } = useTheme()
  const [profilePictureURL, setProfilePictureURL] = useState('')
  const usersUnsubscribe = useRef(null)

  const usersRef = firebase.firestore().collection('users')
  const userRef = usersRef.doc(props.user.userID)

  useEffect(() => {
    usersUnsubscribe.current = userRef.onSnapshot(user => {
      if (user.exists) {
        setProfilePictureURL(user.data().profilePictureURL)
      }
    })

    return () => {
      usersUnsubscribe.current && usersUnsubscribe.current()
    }
  }, [])

  return (
    <View style={[styles.container, props.style]}>
      <Image style={styles.profileIcon} source={{ uri: profilePictureURL }} />
      <View
        style={[
          styles.onlineView,
          props.user.isOnline
            ? {
                backgroundColor: theme.colors[appearance].primaryForeground,
              }
            : { backgroundColor: 'gray' },
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  profileIcon: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  onlineView: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: 'white',
  },
})

export default AvatorView
