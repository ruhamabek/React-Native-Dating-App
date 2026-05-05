import { I18nManager, StyleSheet } from 'react-native'

const styles = (theme, appearance) => {
  return StyleSheet.create({
    textInput: {
      color: theme.colors[appearance].primaryText,
      backgroundColor: theme.colors[appearance].primaryBackground,
      height: 48,
      borderColor: theme.colors[appearance].grey3,
      borderWidth: 1,
      borderRadius: theme.borderRadii?.button ?? 0,
      paddingLeft: 20,
      width: '100%',
      textAlign: I18nManager.isRTL ? 'right' : 'left',
      alignSelf: 'center',
      alignItems: 'center',
    },
  })
}

export default styles
