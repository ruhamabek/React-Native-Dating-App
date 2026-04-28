import { StyleSheet } from 'react-native'
import { DEVICE_HEIGHT } from '../../../core/helpers/statics'
import { size } from '../../../core/helpers/devices'

const dynamicStyles = (theme, appearance) => {
  const colors = theme.colors[appearance]

  return StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: colors.primaryBackground,
    },
    photoView: {
      width: '100%',
      height: DEVICE_HEIGHT * 0.5,
      backgroundColor: colors.grey3,
    },
    profilePhoto: {
      width: '100%',
      height: '100%',
    },
    backView: {
      position: 'absolute',
      top: DEVICE_HEIGHT * 0.467,
      right: 20,
      width: 52,
      height: 52,
      borderRadius: 26,
      backgroundColor: '#89CFF0',
      justifyContent: 'center',
      alignItems: 'center',
       shadowColor: '#89CFF0',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
    backIcon: {
      width: 24,
      height: 24,
      contentFit: 'contain',
      tintColor: 'white',
    },
    titleView: {
      width: '100%',
      paddingHorizontal: 20,
      marginVertical: 20,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'baseline',
    },
    nameText: {
      fontSize: 28,
      fontWeight: '700',
      marginRight: 8,
      color: colors.primaryText,
      letterSpacing: -0.3,
    },
    ageText: {
      fontSize: 24,
      color: colors.secondaryText,
      fontWeight: '400',
    },
    captionView: {
      width: '100%',
      paddingHorizontal: 20,
    },
    itemView: {
      width: '100%',
      paddingVertical: 3,
      marginVertical: 2,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    icon: {
      width: size(18),
      height: size(18),
      tintColor: colors.secondaryText,
    },
    text: {
      paddingLeft: size(8),
      fontSize: size(15),
      color: colors.secondaryText,
      backgroundColor: 'transparent',
    },
    lineView: {
      marginTop: 16,
      marginHorizontal: 20,
      width: '90%',
      height: StyleSheet.hairlineWidth,
      backgroundColor: colors.hairline,
    },
    bioView: {
      width: '100%',
      paddingHorizontal: 20,
      marginVertical: 16,
    },
    label: {
      fontSize: size(18),
      fontWeight: '700',
      color: colors.primaryText,
      letterSpacing: -0.2,
    },
    bioText: {
      fontSize: size(16),
      color: colors.secondaryText,
      lineHeight: size(24),
    },
    instagramView: {
      width: '100%',
      height: 270,
      paddingHorizontal: 20,
    },
    slide: {
      flex: 1,
      justifyContent: 'center',
    },
    myphotosItemView: {
      width: 100,
      height: 100,
      marginHorizontal: 6,
      marginVertical: 6,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.grey3,
      overflow: 'hidden',
    },
    inlineActionsContainer: {
      flex: 1,
      width: '100%',
      backgroundColor: colors.primaryBackground,
      alignSelf: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
    },
    closeButton: {
      alignSelf: 'flex-end',
      height: 28,
      width: 28,
      borderRadius: 14,
      backgroundColor: 'rgba(0,0,0,0.15)',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 40,
      marginRight: 15,
    },
    closeButton__text: {
      backgroundColor: 'transparent',
      fontSize: 35,
      lineHeight: 35,
      color: '#FFF',
      textAlign: 'center',
    },
  })
}

export default dynamicStyles
