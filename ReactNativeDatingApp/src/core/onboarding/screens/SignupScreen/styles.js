import { Dimensions, I18nManager, StyleSheet, Platform } from 'react-native'

const { height } = Dimensions.get('window')
const imageSize = height * 0.232
const photoIconSize = imageSize * 0.27

const dynamicStyles = (theme, colorScheme) => {
  const colorSet = theme.colors[colorScheme]
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colorSet.primaryBackground,
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

    content: {
      paddingLeft: 50,
      paddingRight: 50,
      textAlign: 'center',
      fontSize: 20,
      color: colorSet.primaryForeground,
    },
    loginContainer: {
      width: '65%',
      backgroundColor: colorSet.primaryForeground,
      borderRadius: 25,
      padding: 10,
      marginTop: 30,
    },

    loginText: {
      color: colorSet.primaryBackground,
    },
    placeholder: {
      color: 'red',
    },
    InputContainer: {
      width: '80%',
      alignSelf: 'center',
      marginTop: 16,
    },

    signupContainer: {
      alignSelf: 'center',
      alignItems: 'center',
      width: '80%',
      backgroundColor: colorSet.primaryForeground,
      borderRadius: 12,
      padding: 12,
      marginTop: 30,
    },
    signupText: {
      color: colorSet.primaryBackground,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    imageBlock: {
      flex: 2,
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageContainer: {
      height: imageSize,
      width: imageSize,
      borderRadius: imageSize,
      shadowColor: '#006',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      overflow: 'hidden',
    },
    formContainer: {
      width: '100%',
      flex: 4,
      alignItems: 'center',
    },
    photo: {
      marginTop: imageSize * 0.77,
      marginLeft: -imageSize * 0.29,
      width: photoIconSize,
      height: photoIconSize,
      borderRadius: photoIconSize,
    },

    addButton: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#d9d9d9',
      opacity: 0.8,
      zIndex: 2,
    },
    orTextStyle: {
      marginTop: 20,
      marginBottom: 10,
      alignSelf: 'center',
      color: colorSet.primaryText,
    },
    PhoneNumberContainer: {
      marginTop: 10,
      marginBottom: 10,
      alignSelf: 'center',
    },
    smsText: {
      color: '#4267b2',
    },
    tos: {
      marginTop: 40,
      alignItems: 'center',
      justifyContent: 'center',
      height: 30,
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
