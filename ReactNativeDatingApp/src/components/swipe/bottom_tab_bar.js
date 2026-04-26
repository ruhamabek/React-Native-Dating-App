import React, { useRef } from 'react'
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Animated,
  Easing,
} from 'react-native'
import { Image } from 'expo-image'
import { useTheme } from '../../core/dopebase'
import { size } from '../../core/helpers/devices'

const BottomTabBar = props => {
  const { theme, appearance } = useTheme()
  const colors = theme.colors[appearance]

  const scaleValue2 = useRef(new Animated.Value(0))
  const scaleValue3 = useRef(new Animated.Value(0))
  const scaleValue4 = useRef(new Animated.Value(0))

  const animateButton = (scaleRef, callback) => {
    scaleRef.current.setValue(0)
    Animated.timing(scaleRef.current, {
      toValue: 1,
      duration: 300,
      easing: Easing.easeOutBack,
      useNativeDriver: true,
    }).start(() => {})
    callback()
  }

  const getCardStyle = (scaleRef) => {
    const scale = scaleRef.current.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0.7, 1],
    })
    return { transform: [{ scale }] }
  }

  return (
    <View style={[styles.container, props.containerStyle]}>
      {/* Dislike / X Button */}
      <TouchableWithoutFeedback
        onPress={() => animateButton(scaleValue2, props.onDislikePressed)}
      >
        <Animated.View
          style={[
            styles.button_container,
            styles.largeButton,
            getCardStyle(scaleValue2),
            props.buttonContainerStyle,
          ]}
        >
          <Image
            source={theme.icons.crossFilled}
            style={[styles.large_icon, { tintColor: '#E31B23' }]}
          />
        </Animated.View>
      </TouchableWithoutFeedback>

      {/* Super Like / Star Button */}
      <TouchableWithoutFeedback
        onPress={() => animateButton(scaleValue3, props.onSuperLikePressed)}
      >
        <Animated.View
          style={[
            styles.button_container,
            styles.smallButton,
            getCardStyle(scaleValue3),
          ]}
        >
          <Image
            source={theme.icons.starFilled}
            style={[styles.small_icon, { tintColor: '#3C94DC' }]}
          />
        </Animated.View>
      </TouchableWithoutFeedback>

      {/* Like / Heart Button */}
      <TouchableWithoutFeedback
        onPress={() => animateButton(scaleValue4, props.onLikePressed)}
      >
        <Animated.View
          style={[
            styles.button_container,
            styles.largeButton,
            getCardStyle(scaleValue4),
          ]}
        >
          <Image
            source={theme.icons.Like}
            style={[styles.large_icon, { tintColor: '#44D48C' }]}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: size(10),
    marginHorizontal: size(40),
    marginBottom: size(35),
  },
  button_container: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
     shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 30,
    elevation: 4,
  },
  largeButton: {
    width: size(64),
    height: size(64),
    borderRadius: 32,
    padding: size(15),
  },
  smallButton: {
    width: size(52),
    height: size(52),
    borderRadius: 26,
    padding: size(12),
  },
  small_icon: {
    width: size(24),
    height: size(24),
    contentFit: 'contain',
  },
  large_icon: {
    width: size(30),
    height: size(30),
    contentFit: 'contain',
  },
})

export default BottomTabBar
