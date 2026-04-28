import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '../../core/dopebase'

const GraceLogo = ({ containerStyle, textStyle }) => {
  const { theme, appearance } = useTheme()
  const colors = theme.colors[appearance]

  return (
    <View style={[styles.headerContainer, containerStyle]}>
      <Text style={[styles.headerTitle, { color: colors.primaryForeground, fontFamily: theme.fontFamilies.headline }, textStyle]}>
        GRACE
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 4,  
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
})

export default GraceLogo
