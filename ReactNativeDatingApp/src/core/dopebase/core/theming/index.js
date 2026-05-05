import React from 'react'
import { useColorScheme } from 'react-native'
import DNDefaultTheme from './default'

export default DNDefaultTheme

export const DopebaseContext = React.createContext()

const defaultProps = {
  children: null,
  theme: {},
}

export function DopebaseProvider(props = defaultProps) {
  const { theme, children, appearance: forcedAppearance } = props
  const systemColorScheme = useColorScheme()
  const appearance = forcedAppearance || systemColorScheme || 'light'
  
  const overridenTheme = { ...DNDefaultTheme, ...theme }
  
  // Resolve appearance-specific tokens
  const resolvedRadii = overridenTheme.borderRadii?.[appearance] || overridenTheme.borderRadii?.light || overridenTheme.borderRadii
  const resolvedFonts = overridenTheme.fontFamilies?.[appearance] || overridenTheme.fontFamilies?.light || overridenTheme.fontFamilies
  
  const context = {
    theme: {
      ...overridenTheme,
      borderRadii: resolvedRadii,
      fontFamilies: resolvedFonts,
    },
    appearance: appearance,
  }
  
  return (
    <DopebaseContext.Provider value={context}>
      {children}
    </DopebaseContext.Provider>
  )
}

export function useDopebase(Component, styles) {
  return props => {
    return (
      <DopebaseContext.Consumer>
        {context => {
          const theme = context.theme || DNDefaultTheme
          const appearance = context.appearance || 'light'
          return (
            <Component
              {...props}
              theme={theme}
              appearance={appearance}
              styles={
                styles &&
                styles(
                  theme,
                  appearance,
                )
              }
            />
          )
        }}
      </DopebaseContext.Consumer>
    )
  }
}

export function extendTheme(theme) {
  return { ...DNDefaultTheme, ...theme }
}

export function useTheme() {
  return React.useContext(DopebaseContext)
}
