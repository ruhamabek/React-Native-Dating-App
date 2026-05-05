import { StyleSheet } from 'react-native'

const dynamicStyles = (theme, colorScheme) => {
  return StyleSheet.create({
    title: {
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingBottom: 25,
      color: theme.colors[colorScheme].primaryBackground,
      fontFamily: theme.fontFamilies.headline,
    },
    text: {
      fontSize: 18,
      textAlign: 'center',
      color: theme.colors[colorScheme].primaryBackground,
      paddingLeft: 10,
      paddingRight: 10,
    },
    image: {
      width: 100,
      height: 100,
      marginBottom: 60,
      tintColor: theme.colors[colorScheme].primaryBackground,
    },
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors[colorScheme].primaryForeground,
      height: '100%',
      width: '100%',
    },
    button: {
      fontSize: 18,
      color: theme.colors[colorScheme].primaryBackground,
      marginTop: 10,
    },
  })
}

export default dynamicStyles
