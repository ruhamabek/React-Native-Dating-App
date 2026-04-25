import React, { memo } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Image } from 'expo-image'
import { useTheme, useTranslations, Button } from '../../core/dopebase'

const NewMatch = memo(props => {
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const { url, onSendMessage, onKeepSwiping } = props

  return (
    <SafeAreaView style={styles.container}>
      {/* Full-bleed background image */}
      <Image
        source={{ uri: url }}
        style={styles.imageContainer}
        contentFit="cover"
        blurRadius={2}
      />
       <View style={styles.overlay} />

      {/* Match content */}
      <View style={styles.contentContainer}>
        {/* Profile image circle */}
        <View style={styles.profileImageWrapper}>
          <Image
            source={{ uri: url }}
            style={styles.profileImage}
            contentFit="cover"
          />
        </View>

        <Text style={styles.title}>{localized("IT'S A MATCH!")}</Text>
        <Text style={styles.subtitle}>
          {localized("You and your match have liked each other.")}
        </Text>

        <Button
          containerStyle={styles.button}
          textStyle={styles.buttonLabel}
          onPress={onSendMessage}
          text={localized('SEND A MESSAGE')}
        />
        <TouchableOpacity style={styles.detailBtn} onPress={onKeepSwiping}>
          <Text style={styles.keepSwipingLabel}>
            {localized('KEEP SWIPING')}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
})

const dynamicStyles = (theme, appearance) => {
  const colors = theme.colors[appearance]

  return StyleSheet.create({
    container: {
      flex: 1,
      width: null,
      height: null,
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: '#000000',
    },
    imageContainer: {
      position: 'absolute',
      ...StyleSheet.absoluteFillObject,
      opacity: 0.5,
    },
    overlay: {
      position: 'absolute',
      ...StyleSheet.absoluteFillObject,
      opacity: 0.6,
      backgroundColor: '#000000',
    },
    contentContainer: {
      width: '100%',
      alignItems: 'center',
      paddingBottom: 60,
      zIndex: 2,
    },
    profileImageWrapper: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 3,
      borderColor: '#E31B23',
      overflow: 'hidden',
      marginBottom: 24,
       shadowColor: '#E31B23',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 20,
      elevation: 10,
    },
    profileImage: {
      width: '100%',
      height: '100%',
    },
    title: {
      fontSize: 42,
      fontWeight: '800',
      color: '#E31B23',
      marginBottom: 8,
      backgroundColor: 'transparent',
      textAlign: 'center',
      letterSpacing: 2,
    },
    subtitle: {
      fontSize: 16,
      fontWeight: '400',
      color: 'rgba(255,255,255,0.7)',
      marginBottom: 40,
      backgroundColor: 'transparent',
      textAlign: 'center',
      paddingHorizontal: 40,
    },
    button: {
      width: '85%',
      height: 56,
      backgroundColor: '#E31B23',
      borderRadius: 16,
      padding: 15,
      marginBottom: 16,
      // Button glow
      shadowColor: '#E31B23',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 6,
    },
    buttonLabel: {
      fontSize: 16,
      fontWeight: '700',
      color: 'white',
      backgroundColor: 'transparent',
      letterSpacing: 1,
    },
    keepSwipingLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: 'rgba(255,255,255,0.6)',
      backgroundColor: 'transparent',
      letterSpacing: 1,
    },
    detailBtn: {
      width: '85%',
      alignItems: 'center',
      marginBottom: 20,
      paddingVertical: 12,
    },
  })
}

export default NewMatch
