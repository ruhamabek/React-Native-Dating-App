import React from 'react'
import { StatusBar } from 'react-native'
import { OnboardingConfigProvider } from './core/onboarding/hooks/useOnboardingConfig'
import { AppNavigator } from './navigations/AppNavigation'
import { useConfig } from './config'
import IAPManagerWrapped from './core/inAppPurchase/IAPManagerWrapped'
import { IAPConfigProvider } from './core/inAppPurchase/hooks/useIAPConfig'
import { ProfileConfigProvider } from './core/profile/hooks/useProfileConfig'

const MainNavigator =
    AppNavigator

const AppContent = () => {
  const config = useConfig()

  return (
    <ProfileConfigProvider config={config}>
      <OnboardingConfigProvider config={config}>
        <IAPConfigProvider config={config}>
          <IAPManagerWrapped>
            <StatusBar />
            <MainNavigator />
          </IAPManagerWrapped>
        </IAPConfigProvider>
      </OnboardingConfigProvider>
    </ProfileConfigProvider>
  )
}

export default AppContent
