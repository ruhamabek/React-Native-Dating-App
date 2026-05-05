import { Platform } from 'react-native'

const HORIZONTAL_SPACING_BASE = Platform.OS === 'web' ? 4 : 2
const VERTICAL_SPACING_BASE = 4

const icons = {
  playButton: require('../assets/icons/play-button.png'),
  logo: require('../assets/images/fire-icon.png'),
  userAvatar: require('../assets/images/default-avatar.jpg'),
  backArrow: require('../assets/icons/arrow-back-icon.png'),
  fireIcon: require('../assets/images/fire-icon.png'),
  userProfile: require('../assets/images/person-filled-icon.png'),
  conversations: require('../assets/images/chat-filled-icon.png'),
  BackgroundLayer: require('../assets/images/layerson2.png'),
  Dislike: require('../assets/images/dislike.png'),
  SuperLike: require('../assets/images/super_like.png'),
  Like: require('../assets/images/heart-filled-icon.png'),
  home: require('../assets/icons/home-icon.png'),
  add_user: require('../assets/icons/add-user-icon.png'),
  add_user_filled: require('../assets/icons/add-user-icon-filled.png'),
  camera: require('../assets/icons/camera-icon.png'),
  cameraFilled: require('../assets/icons/camera-filled.png'),
  chat: require('../assets/icons/chat-icon.png'),
  close: require('../assets/icons/close-x-icon.png'),
  checked: require('../assets/icons/checked-icon.png'),
  delete: require('../assets/icons/delete.png'),
  friends: require('../assets/icons/friends-icon.png'),
  inscription: require('../assets/icons/inscription-icon.png'),
  menu: require('../assets/icons/menu.png'),
  private_chat: require('../assets/icons/private-chat-icon.png'),
  search: require('../assets/icons/search-icon.png'),
  share: require('../assets/icons/share-icon.png'),
  vip: require('../assets/icons/vip.png'),
  logout: require('../assets/images/logout-menu-item.png'),
  instagram: require('../assets/images/icons8-instagram-100.png'),
  account: require('../assets/images/account-male-icon.png'),
  setting: require('../assets/images/settings-menu-item.png'),
  callIcon: require('../assets/images/contact-call-icon.png'),
  schoolIcon: require('../assets/images/educate-school-icon.png'),
  markerIcon: require('../assets/images/icons8-marker-500.png'),
  arrowdownIcon: require('../assets/images/arrow-down-icon.png'),
  boederImgSend: require('../assets/images/borderImg1.png'),
  boederImgReceive: require('../assets/images/borderImg2.png'),
  textBoederImgSend: require('../assets/images/textBorderImg1.png'),
  textBoederImgReceive: require('../assets/images/textBorderImg2.png'),
  starFilled: require('../assets/images/star-filled-icon2.png'),
  crossFilled: require('../assets/images/cross-filled-icon.png'),
  blockedUser: require('../assets/icons/blocked-user-64.png'),
  Logo: require('../assets/images/Logo.png'),
  tick: require('../assets/icons/tick.png'),
  undo: require('../assets/icons/undo.png'),
}
 
const crimsonPalette = {
  crimson: '#E31B23',
  crimsonDark: '#B90014',
  crimsonLight: '#FFB4AC',
  crimsonContainer: '#FFDAD6',
  black: '#000000',
  white: '#FFFFFF',
  surface: '#F9F9F9',
  surfaceDim: '#DADADA',
  surfaceContainer: '#EEEEEE',
  surfaceContainerHigh: '#E8E8E8',
  surfaceContainerHighest: '#E2E2E2',
  surfaceContainerLow: '#F3F3F3',
  onSurface: '#1A1C1C',
  onSurfaceVariant: '#5D3F3C',
  outline: '#926E6B',
  outlineVariant: '#E7BDB8',
  secondary: '#5E5E5E',
  secondaryContainer: '#E2E2E2',
  tertiary: '#5A5B5C',
  error: '#BA1A1A',
  green: '#44D48C',
  blue: '#3C94DC',
}

const monochromePalette = {
  black: '#000000',
  white: '#FFFFFF',
  grey: '#1a1a1a',
  outline: '#FFFFFF',
}

const lightColors = {
  primaryBackground: '#FFFFFF',
  secondaryBackground: '#F9F9F9',
  primaryForeground: crimsonPalette.crimson,
  secondaryForeground: '#F5F5F5',
  foregroundContrast: 'white',
  primaryText: '#1A1C1C',
  secondaryText: '#5D3F3C',
  hairline: '#E7BDB8',
  grey0: '#F9F9F9',
  grey3: '#F5F5F5',
  grey6: '#E5E5E5',
  grey9: '#926E6B',
  red: crimsonPalette.crimson,
  // Crimson-specific tokens
  crimson: crimsonPalette.crimson,
  crimsonDark: crimsonPalette.crimsonDark,
  crimsonLight: crimsonPalette.crimsonLight,
  surfaceGlass: 'rgba(255,255,255,0.85)',
  gradientScrimStart: 'transparent',
  gradientScrimEnd: 'rgba(0,0,0,0.65)',
  cardBackground: '#FFFFFF',
  tabBarBackground: 'rgba(255,255,255,0.92)',
  tabBarBorder: 'rgba(0,0,0,0.06)',
  activeTabTint: crimsonPalette.crimson,
  inactiveTabTint: '#926E6B',
  chipBackground: '#F5F5F5',
  chipText: '#1A1C1C',
  overlayBackground: 'rgba(0,0,0,0.7)',
}

const darkColors = {
  primaryBackground: '#000000',
  secondaryBackground: '#121212',
  primaryForeground: crimsonPalette.crimson,
  secondaryForeground: '#1A1A1A',
  foregroundContrast: 'white',
  primaryText: '#FFFFFF',
  secondaryText: '#C5C5C5',
  hairline: '#2A2A2A',
  grey0: '#0A0A0A',
  grey3: '#1A1A1A',
  grey6: '#F5F5F5',
  grey9: '#EAEAEA',
  red: crimsonPalette.crimson,
   crimson: crimsonPalette.crimson,
  crimsonDark: crimsonPalette.crimsonDark,
  crimsonLight: crimsonPalette.crimsonLight,
  surfaceGlass: 'rgba(0,0,0,0.75)',
  gradientScrimStart: 'transparent',
  gradientScrimEnd: 'rgba(0,0,0,0.8)',
  cardBackground: '#1A1A1A',
  tabBarBackground: 'rgba(0,0,0,0.88)',
  tabBarBorder: 'rgba(255,255,255,0.08)',
  activeTabTint: crimsonPalette.crimson,
  inactiveTabTint: '#666666',
  chipBackground: '#2A2A2A',
  chipText: '#EAEAEA',
  overlayBackground: 'rgba(0,0,0,0.85)',
}

const monochromeColors = {
  primaryBackground: '#000000',
  secondaryBackground: '#000000',
  primaryForeground: '#FFFFFF',
  secondaryForeground: '#1A1A1A',
  foregroundContrast: '#000000',
  primaryText: '#FFFFFF',
  secondaryText: '#FFFFFF',
  hairline: '#FFFFFF',
  grey0: '#000000',
  grey3: '#FFFFFF', // High contrast border
  grey6: '#FFFFFF',
  grey9: '#FFFFFF',
  red: '#FFFFFF',
  surfaceGlass: 'rgba(0,0,0,0.9)',
  gradientScrimStart: 'transparent',
  gradientScrimEnd: 'rgba(0,0,0,1)',
  cardBackground: '#000000',
  tabBarBackground: '#000000',
  tabBarBorder: '#FFFFFF',
  activeTabTint: '#FFFFFF',
  inactiveTabTint: '#666666',
  chipBackground: '#000000',
  chipText: '#FFFFFF',
  overlayBackground: 'rgba(0,0,0,0.95)',
}

const monochromeBorderRadii = {
  chip: 0,
  button: 0,
  card: 0,
  full: 0,
}

const monochromeFontFamilies = {
  headline: 'PlusJakartaSans',
  body: 'PlusJakartaSans',
  label: 'PlusJakartaSans',
}

const InstamobileTheme = {
  colors: {
    light: lightColors,
    'no-preference': lightColors,
    dark: darkColors,
    monochrome: monochromeColors,
  },
  spaces: {
    horizontal: {
      s: 2 * HORIZONTAL_SPACING_BASE,
      m: 4 * HORIZONTAL_SPACING_BASE,
      l: 6 * HORIZONTAL_SPACING_BASE,
      xl: 8 * HORIZONTAL_SPACING_BASE,
    },
    vertical: {
      s: 2 * VERTICAL_SPACING_BASE,
      m: 4 * VERTICAL_SPACING_BASE,
      l: 6 * VERTICAL_SPACING_BASE,
      xl: 8 * VERTICAL_SPACING_BASE,
    },
  },
  fontSizes: {
    xxs: 8,
    xs: 12,   // label-sm
    s: 14,    // label-bold
    m: 16,    // body-md
    l: 18,    // body-lg
    xl: 24,   // headline-md
    xxl: 32,  // headline-lg
    display: 40, // display-xl
  },
  fontWeights: {
    s: '400',
    m: '600',
    l: '700',
    xl: '800',
  },
  borderRadii: {
    light: {
      chip: 8,
      button: 16,
      card: 24,
      full: 9999,
    },
    dark: {
      chip: 8,
      button: 16,
      card: 24,
      full: 9999,
    },
    monochrome: monochromeBorderRadii,
  },
  fontFamilies: {
    light: {
      headline: 'PlusJakartaSans',
      body: 'BeVietnamPro',
      label: 'BeVietnamPro',
    },
    dark: {
      headline: 'PlusJakartaSans',
      body: 'BeVietnamPro',
      label: 'BeVietnamPro',
    },
    monochrome: monochromeFontFamilies,
  },
  icons: icons,
}

export default InstamobileTheme
export { crimsonPalette }
