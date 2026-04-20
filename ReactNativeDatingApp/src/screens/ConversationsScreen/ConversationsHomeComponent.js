import React, { memo, useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import { useTheme, StoriesTray } from '../../core/dopebase'
import { IMConversationListView } from '../../core/chat'
import dynamicStyles from './styles'

const ConversationsHomeComponent = memo(props => {
  const { matches, onMatchUserItemPress, navigation, emptyStateConfig } = props
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const channels = useSelector(state => state.chat.channels ?? [])

  const inactiveConversations = useMemo(() => {
    const channelsParticipantsIDs = channels.flatMap(channel =>
      channel.participants.map(participant => participant.id),
    )

    return matches.filter(match => !channelsParticipantsIDs.includes(match.id))
  }, [matches, channels])

  const renderHeaderComponent = useCallback(() => {
    return (
      <StoriesTray
        onStoryItemPress={onMatchUserItemPress}
        storyItemContainerStyle={styles.userImageContainer}
        data={inactiveConversations}
        displayLastName={false}
        showOnlineIndicator={true}
      />
    )
  }, [onMatchUserItemPress, inactiveConversations])

  return (
    <View style={styles.container}>
      <IMConversationListView
        navigation={navigation}
        emptyStateConfig={emptyStateConfig}
        headerComponent={renderHeaderComponent}
      />
    </View>
  )
})

export default ConversationsHomeComponent
