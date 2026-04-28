import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from 'react-native'
import { Image } from 'expo-image'
 import { useTheme } from '../../core/dopebase'
import { size } from '../../core/helpers/devices'
import * as Statics from '../../core/helpers/statics'

const TinderCard = props => {
  const { url, name, age, school, distance, bio } = props
  const { theme, appearance } = useTheme()
  const colors = theme.colors[appearance]

  return (
    <View style={[styles.container, styles.cardStyle]}>
      <ImageBackground
        source={{ uri: url }}
        style={styles.news_image_style}
        imageStyle={styles.imageRadius}
      >
        {/* Story indicator dots at top */}
        <View style={styles.storyIndicatorContainer}>
          <View style={styles.storyIndicatorActive} />
          <View style={styles.storyIndicatorInactive} />
          <View style={styles.storyIndicatorInactive} />
        </View>

        {/* Dark scrim at bottom */}
        <View style={styles.gradientScrim}>
          <View style={styles.userDetailContainer}>
            <View style={styles.nameRow}>
              <Text style={styles.name_style}>
                {name ? name : ' '}, {age ? age : ' '}
              </Text>
            </View>
            {bio ? (
              <Text style={styles.bioQuote} numberOfLines={2}>
                "{bio}"
              </Text>
            ) : (
              <View style={styles.txtBox}>
                <Image style={styles.icon} source={theme.icons.schoolIcon} />
                <Text style={styles.label}>{school ? school : ' '}</Text>
              </View>
            )}
            {distance && (
              <View style={styles.txtBox}>
                <Image style={styles.icon} source={theme.icons.markerIcon} />
                <Text style={styles.label}>{distance}</Text>
              </View>
            )}
          </View>
          <View style={styles.undoIconContainer}>
            <TouchableOpacity
              onPress={props.undoSwipe}
              style={styles.roundUndoIconContainer}
            >
              <Image style={styles.undoIcon} source={theme.icons.undo} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const undoIconSize = size(18)
const undoIconContainerSize = undoIconSize + 12

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  cardStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: Platform.OS === 'web' ? 1024 : Statics.DEVICE_WIDTH,
  },
  news_image_style: {
    width: Platform.OS === 'web' ? 1024 - 40 : Statics.DEVICE_WIDTH - size(40),
    height: Statics.DEVICE_HEIGHT * 0.68,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginHorizontal: size(18),
    marginTop: 0,
    overflow: 'hidden',
    backgroundColor: '#1A1A1A',
  },
  imageRadius: {
    borderRadius: 24,
  },
  // Story indicator bars at top of card
  storyIndicatorContainer: {
    position: 'absolute',
    top: 12,
    left: 16,
    right: 16,
    flexDirection: 'row',
    gap: 4,
    zIndex: 10,
  },
  storyIndicatorActive: {
    flex: 1,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#89CFF0',
  },
  storyIndicatorInactive: {
    flex: 1,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
   gradientScrim: {
    padding: size(20),
    paddingBottom: size(24),
    flexDirection: 'row',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    backgroundColor: 'rgba(28, 45, 59, 0.45)', // Blue-tinted soft scrim
  },
  userDetailContainer: {
    flex: 4,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  undoIconContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingBottom: 4,
  },
  roundUndoIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: undoIconContainerSize,
    width: undoIconContainerSize,
    borderRadius: undoIconContainerSize / 2,
    backgroundColor: '#89CFF0',
    zIndex: 2,
  },
  name_style: {
    fontFamily: 'NotoSerif-Bold',
    fontSize: size(28),
    fontWeight: '700',
    color: 'white',
    marginBottom: size(4),
    backgroundColor: 'transparent',
    letterSpacing: -0.3,
  },
  bioQuote: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: size(14),
    fontWeight: '400',
    color: 'rgba(255,255,255,0.9)',
    fontStyle: 'italic',
    marginTop: size(4),
    backgroundColor: 'transparent',
    lineHeight: size(20),
  },
  txtBox: {
    marginTop: size(4),
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: size(16),
    height: size(16),
    tintColor: 'rgba(255,255,255,0.8)',
  },
  undoIcon: {
    width: size(16),
    height: size(16),
    tintColor: 'white',
  },
  label: {
    paddingLeft: size(6),
    fontSize: size(14),
    fontWeight: '400',
    color: 'rgba(255,255,255,0.85)',
    backgroundColor: 'transparent',
  },
  detailBtn: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})

export default TinderCard
