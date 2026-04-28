import { Platform, StyleSheet } from 'react-native'

const dynamicStyles = (theme, colorScheme) => {
  const colorSet = theme.colors[colorScheme]
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colorSet.primaryBackground,
    },
    logo: {
      width: 150,
      height: 150,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      marginTop: -100,
    },
    logoImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
      tintColor: colorSet.primaryForeground,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      fontFamily: theme.fontFamilies.headline,
      color: colorSet.primaryForeground,
      marginTop: 40,
      marginBottom: 16,
      textAlign: 'center',
    },
    caption: {
      fontSize: 16,
      fontFamily: theme.fontFamilies.body,
      paddingHorizontal: 40,
      marginBottom: 40,
      textAlign: 'center',
      color: colorSet.secondaryText,
      lineHeight: 24,
    },
    loginContainer: {
      width: '70%',
      backgroundColor: colorSet.primaryForeground,
      borderRadius: 25,
      padding: 10,
      paddingTop: 14,
      paddingBottom: 14,
      marginTop: 30,
      alignItems: 'center',
      justifyContent: 'center',
      height: 48,
    },
    loginText: {
      color: colorSet.primaryBackground,
      fontSize: 15,
      fontWeight: 'normal',
    },
    signupContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '70%',
      backgroundColor: colorSet.primaryBackground,
      borderRadius: 25,
      borderWidth: Platform.OS === 'ios' ? 0.5 : 1.0,
      borderColor: colorSet.primaryForeground,
      padding: 10,
      paddingTop: 14,
      paddingBottom: 14,
      marginTop: 20,
      alignSelf: 'center',
    },
    signupText: {
      color: colorSet.primaryForeground,
      fontSize: 14,
      fontWeight: 'normal',
    },
    dismissButton: {
      position: 'absolute',
      top: 36,
      right: 24,
    },
  })
}

export default dynamicStyles
