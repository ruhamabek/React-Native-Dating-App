import { I18nManager, StyleSheet, Platform } from 'react-native'

const dynamicStyles = (theme, colorScheme) => {
  const colorSet = theme.colors[colorScheme]
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colorSet.primaryBackground,
    },
    orTextStyle: {
      color: colorSet.primaryText,
      marginTop: 40,
      marginBottom: 10,
      alignSelf: 'center',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      fontFamily: theme.fontFamilies.headline,
      color: colorSet.primaryForeground,
      marginTop: 25,
      marginBottom: 30,
      alignSelf: 'stretch',
      textAlign: 'left',
      marginLeft: 30,
    },
    loginContainer: {
      width: '80%',
      backgroundColor: colorSet.primaryForeground,
      borderRadius: 12,
      padding: 12,
      marginTop: 40,
      alignSelf: 'center',
      alignItems: 'center',
    },
    loginText: {
      color: '#ffffff',
    },
    placeholder: {
      color: 'red',
    },
    InputContainer: {
      width: '80%',
      alignSelf: 'center',
      marginTop: 20,
    },

    facebookContainer: {
      width: '70%',
      backgroundColor: '#4267B2',
      borderRadius: 25,
      padding: 10,
      marginTop: 30,
      alignSelf: 'center',
      alignItems: 'center',
    },
    googleButtonStyle: {
      alignSelf: 'center',
      marginTop: 15,
      padding: 5,
      elevation: 0,
    },
    appleButtonContainer: {
      width: '70%',
      height: 40,
      marginTop: 16,
      alignSelf: 'center',
    },
    facebookText: {
      color: '#ffffff',
      fontSize: 14,
    },
    phoneNumberContainer: {
      alignItems: 'center',
      marginTop: 20,
    },
    phoneNumber: {
      color: colorSet.primaryText,
    },
    forgotPasswordContainer: {
      width: '80%',
      alignSelf: 'center',
      alignItems: 'flex-end',
      marginTop: 8,
    },
    forgotPasswordText: {
      fontSize: 14,
      padding: 4,
      color: colorSet.primaryText,
    },
    backArrowStyle: {
      resizeMode: 'contain',
      tintColor: colorSet.primaryForeground,
      width: 25,
      height: 25,
      marginTop: Platform.OS === 'ios' ? 50 : 20,
      marginLeft: 10,
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
  })
}

export default dynamicStyles
