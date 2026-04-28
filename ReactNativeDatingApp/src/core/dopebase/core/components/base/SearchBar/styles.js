import { StyleSheet } from 'react-native'

const styles = (theme, appearance) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flex: 1,
      backgroundColor: theme.colors[appearance].primaryBackground,
      borderRadius: 10,
    },
    textInput: {
      flex: 3,
      fontSize: 16,
      backgroundColor: theme.colors[appearance].grey3,
      width: '100%',
      height: 40,
      borderRadius: 12,
      paddingHorizontal: 16,
      fontFamily: theme.fontFamilies.body,
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
