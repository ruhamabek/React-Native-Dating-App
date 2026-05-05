import { StyleSheet } from 'react-native'

const dynamicStyles = (theme, appearance) => {
  const colors = theme.colors[appearance]

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.primaryBackground,
    },
    container: {
      flex: 1,
      backgroundColor: colors.primaryBackground,
      paddingBottom: 80,  
    },
     headerContainer: {
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 24,
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: 22,
      fontWeight: '800',
      color: colors.primaryForeground,
      letterSpacing: 1,
      textTransform: 'uppercase',
    },
    // Search Bar
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: appearance === 'monochrome' ? colors.primaryBackground : '#1C1C1E',
      borderRadius: theme.borderRadii.chip,
      borderWidth: appearance === 'monochrome' ? 1 : 0,
      borderColor: colors.grey3,
      marginHorizontal: 20,
      marginBottom: 32,
      paddingHorizontal: 16,
      height: 52,
    },
    searchIcon: {
      width: 20,
      height: 20,
      marginRight: 10,
    },
    searchInput: {
      flex: 1,
      color: '#FFFFFF',
      fontSize: 15,
      fontWeight: '500',
    },
    // Section headers
    sectionContainer: {
      paddingTop: 8,
      marginBottom: 16,
    },
    sectionHeaderRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    sectionTitle: {
      fontSize: 12,
      fontWeight: '700',
      color: '#E0E0E0',
      letterSpacing: 2,
      textTransform: 'uppercase',
    },
    viewAllButton: {
      fontSize: 10,
      fontWeight: '800',
      color: colors.crimson,
      letterSpacing: 1.5,
      textTransform: 'uppercase',
    },
    // Match avatar styling
    userImageContainer: {
      borderWidth: 2,
      borderColor: colors.primaryForeground,
      borderRadius: theme.borderRadii.chip,
    },
    // Messages section
    messagesHeaderContainer: {
      paddingTop: 24,
      paddingHorizontal: 20,
      paddingBottom: 16,
    },
    content: {
      flexDirection: 'row',
    },
    message: {
      flex: 2,
      color: colors.secondaryText,
    },
  })
}

export default dynamicStyles
