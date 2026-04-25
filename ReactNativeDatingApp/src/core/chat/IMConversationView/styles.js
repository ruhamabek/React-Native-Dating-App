import { StyleSheet } from 'react-native'

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorSet.primaryBackground,
    },
    userImageContainer: {
      borderWidth: 0,
    },
    chatItemContainer: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingVertical: 14,
      alignItems: 'center',
    },
    chatItemContent: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: 16,
    },
    chatItemMiddle: {
      flex: 1,
      marginRight: 12,
    },
    chatItemRight: {
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    chatFriendName: {
      color: colorSet.primaryText,
      fontSize: 16,
      fontWeight: '700',
      marginBottom: 6,
    },
    message: {
      color: colorSet.secondaryText,
      fontSize: 14,
    },
    unReadmessage: {
      color: colorSet.primaryText,
    },
    timestamp: {
      color: '#666666',
      fontSize: 10,
      fontWeight: '700',
      letterSpacing: 0.5,
      textTransform: 'uppercase',
      marginBottom: 8,
    },
    timestampUnread: {
      color: colorSet.crimson || '#E31B23',
    },
    unreadBadge: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: colorSet.crimson || '#E31B23',
    },
  })
}

export default dynamicStyles
