import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useSelector } from 'react-redux'
import { useTheme, TouchableIcon } from '../core/dopebase'
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
import { Platform, SafeAreaView, View } from 'react-native'

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

const MyProfileStackNavigator = createStackNavigator()
const MyProfileStack = () => {
  const { theme, appearance } = useTheme()

  return (
    <MyProfileStackNavigator.Navigator
      initialRouteName="MyProfile"
      screenOptions={{ headerTitleAlign: 'center' }}
    >
      <MyProfileStackNavigator.Screen
        name="MyProfile"
        options={({ navigation }) => ({
          headerTitle: () => (
            <TouchableIcon
              imageStyle={{ tintColor: '#d1d7df' }}
              iconSource={theme.icons.fireIcon}
              onPress={() => navigation.navigate('Swipe')}
            />
          ),
          headerRight: () => (
            <TouchableIcon
              imageStyle={{ tintColor: '#d1d7df' }}
              iconSource={theme.icons.conversations}
              onPress={() => {
                //navigation.pop();
                navigation.navigate('Matches')
              }}
            />
          ),
          headerLeft: () => (
            <TouchableIcon
              imageStyle={{
                tintColor: theme.colors[appearance].primaryForeground,
              }}
              iconSource={theme.icons.userProfile}
            />
          ),
          headerStyle: {
            backgroundColor: theme.colors[appearance].primaryBackground,
            borderBottomWidth: 0,
          },
          headerTintColor: theme.colors[appearance].primaryText,
        })}
        component={MyProfileScreen}
      />
      <MyProfileStackNavigator.Screen
        options={{ headerBackTitle: 'Back' }}
        name="AccountDetails"
        component={IMEditProfileScreen}
      />
      <MyProfileStackNavigator.Screen
        options={{ headerBackTitle: 'Back' }}
        name="Settings"
        component={IMUserSettingsScreen}
      />
      <MyProfileStackNavigator.Screen
        options={{ headerBackTitle: 'Back' }}
        name="ContactUs"
        component={IMContactUsScreen}
      />
      <MyProfileStackNavigator.Screen
        options={{ headerBackTitle: 'Back' }}
        name="BlockedUsers"
        component={IMBlockedUsersScreen}
      />
    </MyProfileStackNavigator.Navigator>
  )
}

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

const doNotShowHeaderOption = {
  headerShown: false,
}

const DrawerStackNavigator = createStackNavigator()
const DrawerStack = () => {
  const { theme, appearance } = useTheme()
  return (
    <DrawerStackNavigator.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerMode: 'float',
        sceneContainerStyle: { maxWidth: 1024, height: '100%', width: '100%' },
      }}
      initialRouteName="Swipe"
    >
      <DrawerStackNavigator.Screen
        options={({ navigation }) => ({
          headerTitle: () => (
            <TouchableIcon
              imageStyle={{
                tintColor: theme.colors[appearance].primaryForeground,
              }}
              iconSource={theme.icons.fireIcon}
              onPress={() => navigation.navigate('Swipe')}
            />
          ),
          headerRight: () => (
            <TouchableIcon
              imageStyle={{ tintColor: '#d1d7df' }}
              iconSource={theme.icons.conversations}
              onPress={() => navigation.navigate('Matches')}
            />
          ),
          headerLeft: () => (
            <TouchableIcon
              imageStyle={{ tintColor: '#d1d7df' }}
              iconSource={theme.icons.userProfile}
              onPress={() => navigation.navigate('MyProfileStack')}
            />
          ),
          headerStyle: {
            backgroundColor: theme.colors[appearance].primaryBackground,
            borderBottomWidth: 0,
          },
          headerTintColor: theme.colors[appearance].primaryText,
        })}
        name="Swipe"
        component={HomeScreen}
      />
      <DrawerStackNavigator.Screen
        options={({ navigation }) => ({
          headerTitle: () => (
            <TouchableIcon
              imageStyle={{ tintColor: '#d1d7df' }}
              iconSource={theme.icons.fireIcon}
              onPress={() => navigation.navigate('Swipe')}
            />
          ),
          headerRight: () => (
            <TouchableIcon
              imageStyle={{
                tintColor: theme.colors[appearance].primaryForeground,
              }}
              iconSource={theme.icons.conversations}
              onPress={() => navigation.navigate('Matches')}
            />
          ),
          headerLeft: () => (
            <TouchableIcon
              imageStyle={{ tintColor: '#d1d7df' }}
              iconSource={theme.icons.userProfile}
              onPress={() => {
                //navigation.pop();
                navigation.navigate('MyProfileStack')
              }}
            />
          ),
          headerStyle: {
            backgroundColor: theme.colors[appearance].primaryBackground,
            borderBottomWidth: 0,
          },
          headerTintColor: theme.colors[appearance].primaryText,
        })}
        name="Matches"
        component={ConversationsStack}
      />

      <DrawerStackNavigator.Screen
        options={{ headerShown: false }}
        name="MyProfileStack"
        component={MyProfileStack}
      />

      <DrawerStackNavigator.Screen
        name="AccountDetails"
        component={IMEditProfileScreen}
      />
    </DrawerStackNavigator.Navigator>
  )
}

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
        component={DrawerStack}
      />
      <MainStack.Screen
        options={{ headerBackTitle: 'Back' }}
        name="PersonalChat"
        component={IMChatScreen}
      />
    </MainStack.Navigator>
  )
}

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
    screens: {
      // PersonalChat: 'channelxxx=:channel',
    },
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
