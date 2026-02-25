export const colors = {
  light: {
    // ── Core surfaces ──
    background: '#F4F5F9',
    foreground: '#1F1F1F',
    card: '#FFFFFF',
    cardForeground: '#1F1F1F',

    // ── Primary brand purple ──
    primary: '#6C5CE7',
    primaryForeground: '#FFFFFF',

    // ── Secondary (lighter purple) ──
    secondary: '#8E7CFF',
    secondaryForeground: '#FFFFFF',

    // ── Muted ──
    muted: '#F3F4F6',
    mutedForeground: '#6B7280',

    // ── Accent gold ──
    accent: '#FFD700',
    accentForeground: '#1F1F1F',

    // ── Destructive ──
    destructive: '#EF4444',
    destructiveForeground: '#FFFFFF',

    // ── Borders ──
    border: '#E5E7EB',
    input: '#E5E7EB',
    ring: '#6C5CE7',

    // ── Gradient stops ──
    gradientStart: '#6C5CE7',
    gradientMid: '#7D6CF3',
    gradientEnd: '#8E7CFF',
  },

  dark: {
    // ── Core surfaces ──
    background: '#0F172A',
    foreground: '#F8FAFC',
    card: '#1E293B',
    cardForeground: '#F8FAFC',

    // ── Primary brand purple ──
    primary: '#5B4DE3',
    primaryForeground: '#FFFFFF',

    // ── Secondary (lighter purple) ──
    secondary: '#7C6CFF',
    secondaryForeground: '#FFFFFF',

    // ── Muted ──
    muted: '#1E293B',
    mutedForeground: '#CBD5E1',

    // ── Accent gold ──
    accent: '#FFD700',
    accentForeground: '#1F1F1F',

    // ── Destructive ──
    destructive: '#DC2626',
    destructiveForeground: '#FFFFFF',

    // ── Borders ──
    border: '#334155',
    input: '#334155',
    ring: '#5B4DE3',

    // ── Gradient stops ──
    gradientStart: '#5B4DE3',
    gradientMid: '#6C5CF3',
    gradientEnd: '#7C6CFF',
  },

  // ══════════════════════════════════════════
  // SHARED (same in both light & dark)
  // ══════════════════════════════════════════

  // ── Nigel brand pink ──
  pink: {
    DEFAULT: '#E91E8C',
    light: '#FF8FBC',
    dark: '#C8177A',
  },

  // ── Gold CTA gradient ──
  gold: {
    DEFAULT: '#FFD700',
    dark: '#F5A623',
    darker: '#E8960C',
    deep: '#B8760A',
  },

  // ── Student sky-blue ──
  student: {
    DEFAULT: '#4FC3F7',
    dark: '#2196F3',
  },

  // ── Teacher purple ──
  teacher: {
    light: {
      DEFAULT: '#6C5CE7',
      dark: '#5B4DE3',
      darker: '#4B3CD2',
    },
    dark: {
      DEFAULT: '#5B4DE3',
      dark: '#4B3CDC',
      darker: '#3C2DC8',
    },
  },

  // ── Success / greens ──
  success: '#22C55E',
  greenLight: '#8BC34A',
  greenMid: '#4CAF50',
  greenLeaf: '#66BB6A',

  // ── Info / Warning / Error ──
  info: {
    light: '#3B82F6',
    dark: '#60A5FA',
  },
  warning: {
    light: '#F59E0B',
    dark: '#D97706',
  },
  error: {
    light: '#EF4444',
    dark: '#DC2626',
  },

  // ── Sand & earth tones ──
  sand: {
    DEFAULT: '#FFE082',
    dark: '#D4A056',
  },
  brown: {
    DEFAULT: '#8D6E63',
    dark: '#C6893A',
  },

  // ── Skin tones (character SVGs) ──
  skin: {
    DEFAULT: '#FFD3B6',
    dark: '#F0B898',
    blush: '#D4836A',
  },

  // ── Stat card icon colors ──
  stat: {
    streak: {
      light: '#EF4444',
      dark: '#F87171',
    },
    balance: {
      light: '#F59E0B',
      dark: '#FBBF24',
    },
    rank: {
      light: '#8E7CFF',
      dark: '#7C6CFF',
    },
  },

  // ── Chart palette ──
  chart: {
    light: ['#6C5CE7', '#E91E8C', '#22C55E', '#F59E0B', '#3B82F6'],
    dark: ['#5B4DE3', '#E91E8C', '#16A34A', '#D97706', '#60A5FA'],
  },

  // ── White alpha overlays ──
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

  // ── Black alpha overlays ──
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

/**
 * Helper: get theme-aware color object
 * Usage: const c = getThemeColors('light');
 *        c.primary → '#6C5CE7'
 */
export function getThemeColors(theme: 'light' | 'dark') {
  return {
    ...colors[theme],
    pink: colors.pink,
    gold: colors.gold,
    student: colors.student,
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

/** Type for the resolved theme colors object */
export type ThemeColors = ReturnType<typeof getThemeColors>;
