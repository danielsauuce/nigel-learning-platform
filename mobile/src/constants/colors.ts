/**
 * Nigel Design System — Color Palette
 *
 * Derived from the Nigel mobile-app screenshots:
 *   • Primary purple : #B9A7F8
 *   • Deep navy      : #22223B
 *   • Peach pink     : #F9D6D0
 *   • Soft pink      : #F7B6B6
 *   • Warm yellow    : #F7E6B6
 *   • Lavender bg    : #F8F6FB
 *   • Card white     : #FFFFFF
 */
export const colors = {
  light: {
    background: '#F8F6FB',
    foreground: '#22223B',
    card: '#FFFFFF',
    cardForeground: '#22223B',

    primary: '#B9A7F8',
    primaryForeground: '#FFFFFF',

    secondary: '#D4C8FF',
    secondaryForeground: '#22223B',

    muted: '#F3F0FF',
    mutedForeground: '#6C6C80',

    accent: '#F7E6B6',
    accentForeground: '#22223B',

    destructive: '#EF4444',
    destructiveForeground: '#FFFFFF',

    border: '#E8E4F0',
    input: '#E8E4F0',
    ring: '#B9A7F8',

    gradientStart: '#B9A7F8',
    gradientMid: '#C9BCFF',
    gradientEnd: '#D4C8FF',
  },

  dark: {
    background: '#1A1A2E',
    foreground: '#F8F6FB',
    card: '#2A2A40',
    cardForeground: '#F8F6FB',

    primary: '#B9A7F8',
    primaryForeground: '#FFFFFF',

    secondary: '#8E7CFF',
    secondaryForeground: '#FFFFFF',

    muted: '#2A2A40',
    mutedForeground: '#A0A0B8',

    accent: '#F7E6B6',
    accentForeground: '#22223B',

    destructive: '#DC2626',
    destructiveForeground: '#FFFFFF',

    border: '#3A3A55',
    input: '#3A3A55',
    ring: '#B9A7F8',

    gradientStart: '#9B8AE0',
    gradientMid: '#B9A7F8',
    gradientEnd: '#D4C8FF',
  },

  purple: {
    DEFAULT: '#B9A7F8',
    light: '#D4C8FF',
    dark: '#8E7CFF',
    deep: '#9B8AED',
    muted: '#E8E0FF',
    bg: '#F3F0FF',
  },

  peach: {
    DEFAULT: '#F9D6D0',
    light: '#FDE8E4',
    dark: '#F0B8AE',
  },

  pink: {
    DEFAULT: '#F7B6B6',
    light: '#FCDADA',
    dark: '#E89999',
  },

  gold: {
    DEFAULT: '#F7E6B6',
    dark: '#E8D49A',
    darker: '#D4BC7A',
    deep: '#C0A660',
  },

  navy: {
    DEFAULT: '#22223B',
    light: '#3A3A55',
    dark: '#16162A',
  },

  success: '#4CAF50',
  greenLight: '#8BC34A',
  greenMid: '#4CAF50',
  greenLeaf: '#66BB6A',

  info: {
    light: '#64B5F6',
    dark: '#42A5F5',
  },
  warning: {
    light: '#FFB74D',
    dark: '#FFA726',
  },
  error: {
    light: '#EF4444',
    dark: '#DC2626',
  },

  sand: {
    DEFAULT: '#F7E6B6',
    dark: '#E8D49A',
  },
  brown: {
    DEFAULT: '#8D6E63',
    dark: '#6D4C41',
  },

  skin: {
    DEFAULT: '#FFD3B6',
    dark: '#F0B898',
    blush: '#F7B6B6',
  },

  stat: {
    streak: { light: '#F7B6B6', dark: '#E89999' },
    balance: { light: '#F7E6B6', dark: '#E8D49A' },
    rank: { light: '#B9A7F8', dark: '#8E7CFF' },
  },

  chart: {
    light: ['#B9A7F8', '#F7B6B6', '#4CAF50', '#F7E6B6', '#64B5F6'],
    dark: ['#8E7CFF', '#E89999', '#388E3C', '#E8D49A', '#42A5F5'],
  },

  whiteAlpha: {
    5: 'rgba(255,255,255,0.05)',
    10: 'rgba(255,255,255,0.10)',
    15: 'rgba(255,255,255,0.15)',
    20: 'rgba(255,255,255,0.20)',
    30: 'rgba(255,255,255,0.30)',
    40: 'rgba(255,255,255,0.40)',
    50: 'rgba(255,255,255,0.50)',
    60: 'rgba(255,255,255,0.60)',
    75: 'rgba(255,255,255,0.75)',
    85: 'rgba(255,255,255,0.85)',
    90: 'rgba(255,255,255,0.90)',
  },

  blackAlpha: {
    5: 'rgba(0,0,0,0.05)',
    10: 'rgba(0,0,0,0.10)',
    15: 'rgba(0,0,0,0.15)',
    20: 'rgba(0,0,0,0.20)',
    30: 'rgba(0,0,0,0.30)',
    40: 'rgba(0,0,0,0.40)',
    50: 'rgba(0,0,0,0.50)',
  },
} as const;

export function getThemeColors(theme: 'light' | 'dark') {
  return {
    ...colors[theme],
    purple: colors.purple,
    peach: colors.peach,
    pink: colors.pink,
    gold: colors.gold,
    navy: colors.navy,
    success: colors.success,
    greenLight: colors.greenLight,
    greenMid: colors.greenMid,
    greenLeaf: colors.greenLeaf,
    sand: colors.sand,
    brown: colors.brown,
    skin: colors.skin,
    stat: {
      streak: colors.stat.streak[theme],
      balance: colors.stat.balance[theme],
      rank: colors.stat.rank[theme],
    },
    info: colors.info[theme],
    warning: colors.warning[theme],
    error: colors.error[theme],
    chart: colors.chart[theme],
    whiteAlpha: colors.whiteAlpha,
    blackAlpha: colors.blackAlpha,
  };
}

export type ThemeColors = ReturnType<typeof getThemeColors>;
