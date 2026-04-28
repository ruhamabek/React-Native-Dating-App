import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import {
  useTheme,
  TouchableIcon,
} from '../core/dopebase'
import {
  IMEditProfileScreen,
  IMUserSettingsScreen,
  IMContactUsScreen,
  IMBlockedUsersScreen,
} from '../core/profile'
import { IMChatScreen } from '../core/chat'
import ConversationsScreen from '../screens/ConversationsScreen/ConversationsScreen'
import HomeScreen from '../screens/HomeScreen/HomeScreen'
import MyProfileScreen from '../screens/MyProfileScreen/MyProfileScreen'
import {
  LoadScreen,
  LoginScreen,
  ResetPasswordScreen,
  SignupScreen,
  SmsAuthenticationScreen,
  WalkthroughScreen,
  WelcomeScreen,
} from '../core/onboarding'
import useNotificationOpenedApp from '../core/helpers/notificationOpenedApp'
import {
  Platform,
  SafeAreaView,
  View,
  StyleSheet,
} from 'react-native'

const Tab = createBottomTabNavigator()

const LoginStackNavigator = createStackNavigator()
const LoginStack = () => {
  return (
    <LoginStackNavigator.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}
    >
      <LoginStackNavigator.Screen name="Welcome" component={WelcomeScreen} />
      <LoginStackNavigator.Screen name="Login" component={LoginScreen} />
      <LoginStackNavigator.Screen name="Signup" component={SignupScreen} />
      <LoginStackNavigator.Screen
        name="Sms"
        component={SmsAuthenticationScreen}
      />
      <LoginStackNavigator.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
      />
    </LoginStackNavigator.Navigator>
  )
}

// ─── Profile Stack (sub-screens within Profile tab) ────────────────
const MyProfileStackNavigator = createStackNavigator()
const MyProfileStack = () => {
  const { theme, appearance } = useTheme()

  return (
    <MyProfileStackNavigator.Navigator
      initialRouteName="MyProfile"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: theme.colors[appearance].primaryBackground,
          borderBottomWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: theme.colors[appearance].primaryText,
      }}
    >
      <MyProfileStackNavigator.Screen
        name="MyProfile"
        options={{ headerShown: false }}
        component={MyProfileScreen}
      />
      <MyProfileStackNavigator.Screen
        options={{ headerBackTitle: 'Back', title: 'Edit Profile' }}
        name="AccountDetails"
        component={IMEditProfileScreen}
      />
      <MyProfileStackNavigator.Screen
        options={{ headerBackTitle: 'Back', title: 'Settings' }}
        name="Settings"
        component={IMUserSettingsScreen}
      />
      <MyProfileStackNavigator.Screen
        options={{ headerBackTitle: 'Back', title: 'Contact Us' }}
        name="ContactUs"
        component={IMContactUsScreen}
      />
      <MyProfileStackNavigator.Screen
        options={{ headerBackTitle: 'Back', title: 'Blocked Users' }}
        name="BlockedUsers"
        component={IMBlockedUsersScreen}
      />
    </MyProfileStackNavigator.Navigator>
  )
}

// ─── Conversations Stack ───────────────────────────────────────────
const ConversationsStackNavigator = createStackNavigator()
const ConversationsStack = () => {
  return (
    <ConversationsStackNavigator.Navigator
      headerLayoutPreset="center"
      screenOptions={{ headerShown: false }}
      initialRouteName="Conversations"
    >
      <ConversationsStackNavigator.Screen
        name="Conversations"
        component={ConversationsScreen}
      />
    </ConversationsStackNavigator.Navigator>
  )
}

// ─── Home/Swipe Stack ──────────────────────────────────────────────
const HomeStackNavigator = createStackNavigator()
const HomeStack = () => {
  const { theme, appearance } = useTheme()
  return (
    <HomeStackNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStackNavigator.Screen name="SwipeHome" component={HomeScreen} />
    </HomeStackNavigator.Navigator>
  )
}

 const GraceTabBar = ({ state,  navigation }) => {
  const { theme, appearance } = useTheme()
  const colors = theme.colors[appearance]

  const tabIcons = {
    Swipe: { icon: theme.icons.fireIcon, label: 'Discover' },
    Matches: { icon: theme.icons.conversations, label: 'Messages' },
    MyProfileStack: { icon: theme.icons.userProfile, label: 'Profile' },
  }

  return (
    <View style={tabBarStyles.outerContainer}>
      <View
        style={[
          tabBarStyles.container,
          {
            backgroundColor: colors.tabBarBackground,
            borderColor: colors.tabBarBorder,
          },
        ]}
      >
        {state.routes.map((route, index) => {
          const isFocused = state.index === index
          const { icon, label } = tabIcons[route.name] || {
            icon: theme.icons.home,
            label: route.name,
          }

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            })
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params)
            }
          }

          return (
            <TouchableIcon
              key={route.key}
              imageStyle={{
                tintColor: isFocused
                  ? colors.activeTabTint
                  : colors.inactiveTabTint,
                width: 24,
                height: 24,
              }}
              iconSource={icon}
              onPress={onPress}
              containerStyle={tabBarStyles.tabItem}
            />
          )
        })}
      </View>
    </View>
  )
}

const tabBarStyles = StyleSheet.create({
  outerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    paddingHorizontal: 20,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    paddingHorizontal: 8,
     shadowColor: '#89CFF0',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 32,
    elevation: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
})

// ─── Main Tab Navigator ────────────────────────────────────────────
const doNotShowHeaderOption = {
  headerShown: false,
}

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <GraceTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Swipe" component={HomeStack} />
      <Tab.Screen name="Matches" component={ConversationsStack} />
      <Tab.Screen name="MyProfileStack" component={MyProfileStack} />
    </Tab.Navigator>
  )
}

// ─── Main Stack (wraps tabs + chat screen) ─────────────────────────
const MainStack = createStackNavigator()
const MainStackNavigator = () => {
  useNotificationOpenedApp()
  return (
    <MainStack.Navigator
      screenOptions={{
        headerMode: 'float',
        sceneContainerStyle: {
          maxWidth: 1024,
          height: '100%',
          width: '100%',
          alignSelf: 'center',
        },
      }}
      initialRouteName="NavStack"
    >
      <MainStack.Screen
        options={doNotShowHeaderOption}
        name="NavStack"
        component={TabNavigator}
      />
      <MainStack.Screen
        options={{ headerBackTitle: 'Back' }}
        name="PersonalChat"
        component={IMChatScreen}
      />
    </MainStack.Navigator>
  )
}

// ─── Root Navigator ────────────────────────────────────────────────
const RootStack = createStackNavigator()
const RootNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        animationEnabled: false,
        headerShown: false,
      }}
      initialRouteName="LoadScreen"
    >
      <RootStack.Screen name="LoadScreen" component={LoadScreen} />
      <RootStack.Screen
        options={{ headerShown: false }}
        name="Walkthrough"
        component={WalkthroughScreen}
      />
      <RootStack.Screen
        options={{ headerShown: false }}
        name="LoginStack"
        component={LoginStack}
      />
      <RootStack.Screen
        options={{ headerShown: false }}
        name="MainStack"
        component={MainStackNavigator}
      />
    </RootStack.Navigator>
  )
}

const linking = {
  prefixes: [
    'https://mydatingapp.com',
    'mydatingapp://',
    'http://localhost:19006',
  ],
  config: {
    screens: {},
  },
}

const AppNavigator = () => {
  if (Platform.OS === 'web') {
    return (
      <SafeAreaView
        style={{
          width: '100%',
          flex: 1,
          alignSelf: 'center',
          maxWidth: 1024,
        }}
      >
        <NavigationContainer linking={linking}>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaView>
    )
  }
  return (
    <NavigationContainer linking={linking}>
      <RootNavigator />
    </NavigationContainer>
  )
}

export { RootNavigator, AppNavigator }
