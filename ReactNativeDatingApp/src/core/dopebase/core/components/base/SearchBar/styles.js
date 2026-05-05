import { I18nManager, StyleSheet } from 'react-native'

const styles = (theme, appearance) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flex: 1,
      backgroundColor: theme.colors[appearance].primaryBackground,
      borderRadius: theme.borderRadii?.chip ?? 0,
      borderWidth: appearance === 'monochrome' ? 1 : 0,
      borderColor: theme.colors[appearance].grey3,
    },
    textInput: {
      flex: 3,
      fontSize: 16,
      backgroundColor: appearance === 'monochrome' ? theme.colors[appearance].primaryBackground : theme.colors[appearance].grey3,
      width: '100%',
      height: '100%',
      borderRadius: theme.borderRadii?.chip ?? 0,
      paddingHorizontal: 10,
      color: theme.colors[appearance].primaryText,
    },
    cancelButtonContainer: {
      flex: 1,
      alignItems: 'flex-end',
    },
    cancelButtonText: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.colors[appearance].primaryForeground,
    },
  })
}

export default styles
