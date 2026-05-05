import { StyleSheet, Platform, Dimensions } from 'react-native'

const dynamicStyles = (theme, appearance) => {
  const width = Dimensions.get('window').width
  const colors = theme.colors[appearance]

  return StyleSheet.create({
    MainContainer: {
      flex: 1,
      backgroundColor: colors.primaryBackground,
    },
    safeAreaContainer: {
      flex: 1,
      backgroundColor: colors.primaryBackground,
    },
    body: {
      width: '100%',
    },

    // ─── Hero Section ───
    heroContainer: {
      width: '100%',
      height: 400,
      overflow: 'hidden',
    },
    heroImage: {
      width: '100%',
      height: 400,
      backgroundColor: colors.grey3,
    },
    heroGradient: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: 20,
      paddingBottom: 24,
      paddingTop: 80,
      backgroundColor: 'rgba(0,0,0,0.45)',
    },
    heroName: {
      fontSize: 28,
      fontWeight: '700',
      color: '#FFFFFF',
      letterSpacing: -0.3,
    },
    locationRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 6,
    },
    locationIcon: {
      width: 14,
      height: 14,
      tintColor: 'rgba(255,255,255,0.8)',
    },
    locationText: {
      fontSize: 14,
      color: 'rgba(255,255,255,0.8)',
      marginLeft: 4,
    },

    // ─── Sections ───
    sectionContainer: {
      paddingHorizontal: 20,
      paddingTop: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.primaryText,
      marginBottom: 12,
      letterSpacing: -0.2,
    },
    bioText: {
      fontSize: 16,
      color: colors.secondaryText,
      lineHeight: 24,
    },

    // ─── Photos Grid ───
    photosGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    myphotosItemView: {
      width: Platform.OS === 'web' ? 160 : Math.floor((width - 56) / 3),
      height: Platform.OS === 'web' ? 160 : Math.floor((width - 56) / 3),
      borderRadius: theme.borderRadii.card,
      overflow: 'hidden',
      backgroundColor: colors.grey3,
    },
    addPhotoButton: {
      backgroundColor: appearance === 'monochrome' ? colors.primaryBackground : colors.crimson + '15',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: appearance === 'monochrome' ? colors.primaryForeground : colors.crimson + '30',
      borderStyle: 'dashed',
      borderRadius: theme.borderRadii.card,
    },
    addPhotoIcon: {
      width: 32,
      height: 32,
      tintColor: appearance === 'monochrome' ? colors.primaryForeground : colors.crimson,
    },

    // ─── Menu Items ───
    menuContainer: {
      paddingHorizontal: 20,
      paddingTop: 28,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 14,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.hairline,
    },
    menuIconContainer: {
      width: 40,
      height: 40,
      borderRadius: theme.borderRadii.chip,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 14,
      borderWidth: appearance === 'monochrome' ? 1 : 0,
      borderColor: colors.primaryForeground,
    },
    menuIcon: {
      width: 20,
      height: 20,
      contentFit: 'contain',
    },
    menuLabel: {
      flex: 1,
      fontSize: 16,
      color: colors.primaryText,
      fontWeight: '500',
    },
    menuChevron: {
      fontSize: 22,
      color: colors.secondaryText,
      fontWeight: '300',
    },

    // ─── Logout ───
    logoutView: {
      marginTop: 28,
      marginHorizontal: 20,
      marginBottom: 40,
      padding: 16,
      borderRadius: theme.borderRadii.button,
      backgroundColor: appearance === 'monochrome' ? colors.primaryForeground : '#ff4444', 
      borderWidth: 1,
      borderColor: appearance === 'monochrome' ? colors.primaryForeground : '#ff4444',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoutText: {
      fontSize: 16,
      fontWeight: '600',
      color: appearance === 'monochrome' ? colors.primaryBackground : '#FFFFFF',
    },

    // ─── Legacy (kept for compatibility) ───
    profilePictureContainer: {
      marginTop: 30,
    },
    nameView: {
      width: '100%',
      marginTop: -10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    name: {
      fontSize: 21,
      fontWeight: 'bold',
      color: colors.primaryText,
      padding: 10,
    },
    inactiveDot: {
      backgroundColor: colors.grey6,
      width: 8,
      height: 8,
      borderRadius: 4,
      marginLeft: 3,
      marginRight: 3,
      marginTop: 3,
      marginBottom: 3,
    },
  })
}

export default dynamicStyles
