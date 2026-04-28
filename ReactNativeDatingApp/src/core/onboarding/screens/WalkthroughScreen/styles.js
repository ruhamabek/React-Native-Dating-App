import { StyleSheet } from 'react-native'

const dynamicStyles = (theme, colorScheme) => {
  return StyleSheet.create({
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      fontFamily: theme.fontFamilies.headline,
      color: 'white',
      textAlign: 'center',
      marginLeft: 40,
      marginRight: 40,
      marginTop: 40,
    },
    text: {
      fontSize: 16,
      fontFamily: theme.fontFamilies.body,
      color: 'white',
      textAlign: 'center',
      marginTop: 16,
      marginLeft: 40,
      marginRight: 40,
      lineHeight: 24,
    },
    image: {
      width: 100,
      height: 100,
      marginBottom: 60,
      tintColor: 'white',
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
      color: 'white',
      marginTop: 10,
    },
  })
}

export default dynamicStyles
