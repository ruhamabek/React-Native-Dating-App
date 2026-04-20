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
      <Image
        source={{
          uri: url,
        }}
        style={styles.imageContainer}
        contentFit="fill"
      />
      <View style={styles.overlay} />

      <Text style={styles.title}>{localized("IT'S A MATCH!")}</Text>
      <Button
        containerStyle={styles.button}
        textStyle={styles.label}
        onPress={onSendMessage}
        text={'SEND A MESSAGE'}
      />
      <TouchableOpacity style={styles.detailBtn} onPress={onKeepSwiping}>
        <Text style={styles.label}>{localized('KEEP SWIPING')}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
})

const dynamicStyles = (theme, appearance) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      width: null,
      height: null,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    imageContainer: {
      position: 'absolute',
      backgroundColor: 'transparent',
      ...StyleSheet.absoluteFillObject,
    },
    overlay: {
      flex: 1,
      position: 'absolute',
      ...StyleSheet.absoluteFillObject,
      opacity: 0.7,
      backgroundColor: 'black',
    },
    title: {
      width: '100%',
      fontSize: 45,
      fontWeight: 'bold',
      color: '#09EE8F',
      marginBottom: 55,
      backgroundColor: 'transparent',
      textAlign: 'center',
    },
    button: {
      width: '85%',
      height: 60,
      backgroundColor: theme.colors[appearance].primaryForeground,
      borderRadius: 12,
      padding: 15,
      marginBottom: 15,
    },
    label: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
      backgroundColor: 'transparent',
    },
    detailBtn: {
      width: '85%',
      alignItems: 'center',
      marginBottom: 75,
    },
  })
}
export default NewMatch
