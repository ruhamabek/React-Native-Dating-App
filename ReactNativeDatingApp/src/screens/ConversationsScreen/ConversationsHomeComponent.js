import React, { memo, useCallback, useMemo } from 'react'
import { View, Text, SafeAreaView, TextInput } from 'react-native'
import { Image } from 'expo-image'
import { useSelector } from 'react-redux'
import { useTheme, useTranslations, StoriesTray } from '../../core/dopebase'
import { IMConversationListView } from '../../core/chat'
import AtelierLogo from '../../components/AtelierLogo/AtelierLogo'
import dynamicStyles from './styles'

const ConversationsHomeComponent = memo(props => {
  const { matches, onMatchUserItemPress, navigation, emptyStateConfig } = props
  const { theme, appearance } = useTheme()
  const { localized } = useTranslations()
  const styles = dynamicStyles(theme, appearance)
  const colors = theme.colors[appearance]

  const channels = useSelector(state => state.chat.channels ?? [])

  const inactiveConversations = useMemo(() => {
    const channelsParticipantsIDs = channels.flatMap(channel =>
      channel.participants.map(participant => participant.id),
    )
    return matches.filter(match => !channelsParticipantsIDs.includes(match.id))
  }, [matches, channels])

  const renderHeaderComponent = useCallback(() => {
    return (
      <View>
        {/* Section: New Encounters */}
        {inactiveConversations.length > 0 && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>{localized('NEW ENCOUNTERS')}</Text>
              <Text style={styles.viewAllButton}>{localized('VIEW ALL')}</Text>
            </View>
            <StoriesTray
              onStoryItemPress={onMatchUserItemPress}
              storyItemContainerStyle={styles.userImageContainer}
              data={inactiveConversations}
              displayLastName={false}
              showOnlineIndicator={false}
            />
          </View>
        )}
        {/* Section: Messages header */}
        <View style={styles.messagesHeaderContainer}>
          <Text style={styles.sectionTitle}>{localized('MESSAGES')}</Text>
        </View>
      </View>
    )
  }, [onMatchUserItemPress, inactiveConversations])

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Screen title */}
        <AtelierLogo />

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Image
            source={theme.icons.search}
            style={[styles.searchIcon, { tintColor: '#8E8E93' }]}
            contentFit="contain"
          />
          <TextInput
            style={styles.searchInput}
            placeholder={localized('Search conversations')}
            placeholderTextColor="#666666"
            clearButtonMode="while-editing"
          />
        </View>

        <IMConversationListView
          navigation={navigation}
          emptyStateConfig={emptyStateConfig}
          headerComponent={renderHeaderComponent}
        />
      </View>
    </SafeAreaView>
  )
})

export default ConversationsHomeComponent
