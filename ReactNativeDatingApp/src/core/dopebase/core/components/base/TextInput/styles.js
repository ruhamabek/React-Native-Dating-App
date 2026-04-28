import { I18nManager, StyleSheet } from 'react-native'

const styles = (theme, appearance) => {
  return StyleSheet.create({
    textInput: {
      color: theme.colors[appearance].primaryText,
      backgroundColor: theme.colors[appearance].primaryBackground,
      height: 48,
      borderColor: theme.colors[appearance].hairline,
      borderWidth: 1,
      borderRadius: 12,
      paddingLeft: 20,
      width: '100%',
      textAlign: I18nManager.isRTL ? 'right' : 'left',
      alignSelf: 'center',
      alignItems: 'center',
      fontFamily: theme.fontFamilies.body,
    },
  })
}

export default styles
