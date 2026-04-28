import { StyleSheet } from 'react-native'

const styles = (theme, appearance) => {
  return StyleSheet.create({
    tnPrimaryText: {
      color: theme.colors[appearance].primaryText,
      fontFamily: theme.fontFamilies.body,
    },
    tnSecondaryText: {
      color: theme.colors[appearance].secondaryText,
      fontFamily: theme.fontFamilies.body,
    },
  })
}

export default styles
