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
 
const gracePalette = {
  primary: '#89CFF0',
  primaryDark: '#0D6683',
  primaryLight: '#BEE9FF',
  primaryContainer: '#89CFF0',
  white: '#FFFFFF',
  background: '#F8F9FF',
  surface: '#FFFFFF',
  surfaceDim: '#CBDBF5',
  surfaceContainer: '#E5EEFF',
  surfaceContainerHigh: '#DCE9FF',
  surfaceContainerHighest: '#D3E4FE',
  surfaceContainerLow: '#EFF4FF',
  surfaceContainerLowest: '#FFFFFF',
  onSurface: '#0B1C30',
  onSurfaceVariant: '#40484D',
  outline: '#70787D',
  outlineVariant: '#BFC8CD',
  secondary: '#4B5A9C',
  secondaryContainer: '#A6B5FD',
  tertiary: '#576065',
  error: '#BA1A1A',
  green: '#44D48C',
  blue: '#89CFF0',
}

const lightColors = {
  primaryBackground: gracePalette.background,
  secondaryBackground: gracePalette.surfaceContainerLow,
  primaryForeground: gracePalette.primary,
  secondaryForeground: gracePalette.surfaceContainer,
  foregroundContrast: '#0B1C30',
  primaryText: '#0B1C30',
  secondaryText: '#40484D',
  hairline: gracePalette.outlineVariant,
  grey0: '#F8FAFC',
  grey3: '#F1F5F9',
  grey6: '#E2E8F0',
  grey9: '#70787D',
  red: '#BA1A1A',
  primaryColor: gracePalette.primary,
  surfaceGlass: 'rgba(255,255,255,0.65)',
  gradientScrimStart: 'transparent',
  gradientScrimEnd: 'rgba(11, 28, 48, 0.4)',
  cardBackground: '#FFFFFF',
  tabBarBackground: 'rgba(248, 249, 255, 0.9)',
  tabBarBorder: 'rgba(141, 156, 175, 0.15)',
  activeTabTint: gracePalette.primary,
  inactiveTabTint: '#70787D',
  chipBackground: gracePalette.secondaryContainer,
  chipText: '#0B1C30',
  overlayBackground: 'rgba(11, 28, 48, 0.6)',
}

const darkColors = {
  primaryBackground: '#0B1C30', // Midnight blue base
  secondaryBackground: '#14253D',
  primaryForeground: gracePalette.primary,
  secondaryForeground: '#213145',
  foregroundContrast: 'white',
  primaryText: '#F8F9FF',
  secondaryText: '#AFC1D6',
  hairline: '#213145',
  grey0: '#07121E',
  grey3: '#14253D',
  grey6: '#213145',
  grey9: '#8D9CAF',
  red: '#BA1A1A',
  primaryColor: gracePalette.primary,
  surfaceGlass: 'rgba(11, 28, 48, 0.75)',
  gradientScrimStart: 'transparent',
  gradientScrimEnd: 'rgba(0,0,0,0.85)',
  cardBackground: '#14253D',
  tabBarBackground: 'rgba(11, 28, 48, 0.9)',
  tabBarBorder: 'rgba(255,255,255,0.1)',
  activeTabTint: gracePalette.primary,
  inactiveTabTint: '#64748B',
  chipBackground: '#213145',
  chipText: '#F8F9FF',
  overlayBackground: 'rgba(0,0,0,0.8)',
}

const InstamobileTheme = {
  colors: {
    light: lightColors,
    'no-preference': lightColors,
    dark: darkColors,
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
    chip: 8,
    button: 16,
    card: 24,
    full: 9999,
  },
   fontFamilies: {
    headline: 'NotoSerif',      // Noto Serif
    body: 'PlusJakartaSans',      // Plus Jakarta Sans
    label: 'PlusJakartaSans',
  },
  icons: icons,
  button: {
    borderRadius: 16,
  },
}

export default InstamobileTheme
export { gracePalette }
