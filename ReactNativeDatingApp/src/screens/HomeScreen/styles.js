import { StyleSheet } from 'react-native'

const dynamicStyles = (theme, appearance) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors[appearance].primaryBackground,
      height: '100%',
    },
    safeAreaContainer: {
      flex: 1,
      backgroundColor: theme.colors[appearance].primaryBackground,
    },
  })
}

export default dynamicStyles
