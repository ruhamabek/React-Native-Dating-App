import React, { memo } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useTheme, useTranslations } from '../../dopebase'
import IMConversationIconView from './IMConversationIconView/IMConversationIconView'
import { timeFormat } from '../../helpers/timeFormat'
import dynamicStyles from './styles'
import { formatMessage } from '../helpers/utils'
import { IMRichTextView } from '../../mentions'

const IMConversationView = memo(props => {
  const { onChatItemPress, item, user } = props

  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const userID = user.userID || user.id
  const { markedAsRead } = item

  let title = item.title

   const getShortTime = (dateObj) => {
    const defaultTime = timeFormat(dateObj)
    if (typeof defaultTime === 'string') {
      return defaultTime.replace(' minutes ago', 'M AGO').replace(' hours ago', 'H AGO').replace('yesterday', 'YESTERDAY')
    }
    return defaultTime
  }

  return (
    <TouchableOpacity
      onPress={() => onChatItemPress(item)}
      style={styles.chatItemContainer}>
      <IMConversationIconView
        participants={
          item?.admins?.length
            ? item.participants
            : item.participants.filter(value => value?.id !== userID)
        }
      />
      <View style={styles.chatItemContent}>
        <View style={styles.chatItemMiddle}>
          <Text style={styles.chatFriendName}>{title}</Text>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={[styles.message, !markedAsRead && styles.unReadmessage]}>
            <IMRichTextView
              emailStyle={[styles.message, !markedAsRead && styles.unReadmessage]}
              phoneStyle={[styles.message, !markedAsRead && styles.unReadmessage]}
              hashTagStyle={[styles.message, !markedAsRead && styles.unReadmessage]}
              usernameStyle={[styles.message, !markedAsRead && styles.unReadmessage]}>
              {formatMessage(item, localized) || ' '}
            </IMRichTextView>
          </Text>
        </View>

        <View style={styles.chatItemRight}>
          <Text style={[styles.timestamp, !markedAsRead && styles.timestampUnread]}>
            {getShortTime(item.updatedAt || item.createdAt)}
          </Text>
          {!markedAsRead && (
            <View style={styles.unreadBadge} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
})

export default IMConversationView
