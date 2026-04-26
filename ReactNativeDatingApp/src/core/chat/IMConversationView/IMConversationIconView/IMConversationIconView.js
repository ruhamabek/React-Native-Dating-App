import { useState, memo } from 'react'
import { View } from 'react-native'
import { Image } from 'expo-image'
import { useTheme } from '../../../dopebase'
import dynamicStyles from './styles'

const defaultAvatar =
  'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'

const IMConversationIconView = props => {
  const { participants, imageStyle, style } = props

  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const [imgErr, setImgErr] = useState(false)
  const [secondImgErr, setSecondImgErr] = useState(false)

  let firstUri =
    participants.length > 0 &&
    participants[0].profilePictureURL &&
    participants[0].profilePictureURL.length > 0
      ? participants[0].profilePictureURL
      : defaultAvatar
  let secondUri =
    participants.length > 1 &&
    participants[1].profilePictureURL &&
    participants[1].profilePictureURL.length > 0
      ? participants[1].profilePictureURL
      : defaultAvatar

  const onImageError = () => {
    setImgErr(true)
  }

  const onSecondImageError = () => {
    setSecondImgErr(true)
  }

  return (
    <View style={styles.container}>
      {participants.length == 0 && (
        <View style={styles.singleParticipation}>
          <Image
            style={styles.singleChatItemIcon}
            source={{ uri: defaultAvatar }}
          />
        </View>
      )}
      {participants.length === 1 && (
        <View style={style ? style : styles.singleParticipation}>
          <Image
            style={[styles.singleChatItemIcon, imageStyle]}
            onError={onImageError}
            source={imgErr ? { uri: defaultAvatar } : { uri: firstUri }}
          />
          {participants[0].isOnline && <View style={styles.onlineMark} />}
        </View>
      )}
      {participants.length > 1 && (
        <View style={styles.multiParticipation}>
          <Image
            style={[styles.multiPaticipationIcon, styles.bottomIcon]}
            onError={onImageError}
            source={imgErr ? { uri: defaultAvatar } : { uri: firstUri }}
          />
          <View style={styles.middleIcon} />
          <Image
            style={[styles.multiPaticipationIcon, styles.topIcon]}
            onError={onSecondImageError}
            source={secondImgErr ? { uri: defaultAvatar } : { uri: secondUri }}
          />
        </View>
      )}
    </View>
  )
}

export default memo(IMConversationIconView)
