import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '../../core/dopebase'

const AtelierLogo = ({ containerStyle, textStyle }) => {
  const { theme, appearance } = useTheme()
  const colors = theme.colors[appearance]

  return (
    <View style={[styles.headerContainer, containerStyle]}>
      <Text style={[styles.headerTitle, { color: colors.primaryText, fontFamily: theme.fontFamilies.headline }, textStyle]}>
        ATELIER
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,  
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
})

export default AtelierLogo
