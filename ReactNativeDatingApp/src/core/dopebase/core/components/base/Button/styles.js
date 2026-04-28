import { StyleSheet } from 'react-native'

const styles = (theme, appearance) => {
  return StyleSheet.create({
    DNButtonContainer: {
      borderRadius: 3,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors[appearance].primaryForeground,
      color: 'white',
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 16,
      paddingBottom: 16,
    },
    DNButtonText: {
      color: theme.colors[appearance].foregroundContrast,
      fontSize: theme.fontSizes.m,
      fontWeight: theme.fontWeights.m,
      fontFamily: theme.fontFamilies.body,
    },
    DNButtonShadow: {
      shadowColor: '#89CFF0',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 6,
    },
  })
}

export default styles
