import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Image } from 'expo-image'
import { useTheme, useTranslations } from '../../core/dopebase'
import { size } from '../../core/helpers/devices'

const NoMoreCard = ({ user }) => {
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const colors = theme.colors[appearance]

  const canComputeRecommendations = React.useMemo(() => {
    const { firstName, email, phone, profilePictureURL } = user
    return (
      firstName && firstName.length > 0 && (email || phone) && profilePictureURL
    )
  }, [user])

  return (
    <View style={styles.container}>
      {user.profilePictureURL && (
        <View style={styles.avatarRing}>
          <Image
            source={{ uri: user.profilePictureURL }}
            style={styles.user_pic_style}
          />
        </View>
      )}

      {canComputeRecommendations ? (
        <Text style={[styles.empty_state_text_style, { color: colors.secondaryText }]}>
          {localized("There's no one new around you.")}
        </Text>
      ) : (
        <View style={{ width: '75%', alignItems: 'center' }}>
          <Text style={[styles.empty_state_text_style, { color: colors.secondaryText }]}>
            {localized(
              'Please complete your dating profile to view recommendations.',
            )}
          </Text>
        </View>
      )}

      <Text style={[styles.hintText, { color: colors.primaryForeground }]}>
        {localized('Check back later')}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  avatarRing: {
    width: size(100),
    height: size(100),
    borderRadius: size(50),
    borderWidth: 3,
    borderColor: '#89CFF0',
    overflow: 'hidden',
    marginBottom: size(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  user_pic_style: {
    width: size(94),
    height: size(94),
    borderRadius: size(47),
  },
  empty_state_text_style: {
    fontSize: size(16),
    textAlign: 'center',
    lineHeight: size(24),
  },
  hintText: {
    fontSize: size(14),
    fontWeight: '600',
    marginTop: size(12),
    letterSpacing: 0.5,
  },
})

export default NoMoreCard
