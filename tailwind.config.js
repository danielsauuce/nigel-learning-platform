/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        fredoka: ['Fredoka_700Bold'],
        'poppins-regular': ['Poppins_400Regular'],
        'poppins-medium': ['Poppins_500Medium'],
        'poppins-semibold': ['Poppins_600SemiBold'],
        'poppins-bold': ['Poppins_700Bold'],
      },
      colors: {
        /* ── Core semantic tokens ── */
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        'card-foreground': 'rgb(var(--card-foreground) / <alpha-value>)',
        popover: 'rgb(var(--popover) / <alpha-value>)',
        'popover-foreground': 'rgb(var(--popover-foreground) / <alpha-value>)',
        primary: 'rgb(var(--primary) / <alpha-value>)',
        'primary-foreground': 'rgb(var(--primary-foreground) / <alpha-value>)',
        secondary: 'rgb(var(--secondary) / <alpha-value>)',
        'secondary-foreground': 'rgb(var(--secondary-foreground) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        'muted-foreground': 'rgb(var(--muted-foreground) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-foreground': 'rgb(var(--accent-foreground) / <alpha-value>)',
        destructive: 'rgb(var(--destructive) / <alpha-value>)',
        'destructive-foreground': 'rgb(var(--destructive-foreground) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        input: 'rgb(var(--input) / <alpha-value>)',
        ring: 'rgb(var(--ring) / <alpha-value>)',

        /* ── Chart colors ── */
        'chart-1': 'rgb(var(--chart-1) / <alpha-value>)',
        'chart-2': 'rgb(var(--chart-2) / <alpha-value>)',
        'chart-3': 'rgb(var(--chart-3) / <alpha-value>)',
        'chart-4': 'rgb(var(--chart-4) / <alpha-value>)',
        'chart-5': 'rgb(var(--chart-5) / <alpha-value>)',

        /* ── App-specific brand colors ── */

        // Background gradient
        'gradient-start': 'rgb(var(--gradient-start) / <alpha-value>)',
        'gradient-mid': 'rgb(var(--gradient-mid) / <alpha-value>)',
        'gradient-end': 'rgb(var(--gradient-end) / <alpha-value>)',

        // Gold (CTAs, coins, rewards)
        gold: {
          DEFAULT: 'rgb(var(--gold) / <alpha-value>)',
          dark: 'rgb(var(--gold-dark) / <alpha-value>)',
          darker: 'rgb(var(--gold-darker) / <alpha-value>)',
          deep: 'rgb(var(--gold-deep) / <alpha-value>)',
        },

        // Student accent (sky blue)
        student: {
          DEFAULT: 'rgb(var(--student) / <alpha-value>)',
          dark: 'rgb(var(--student-dark) / <alpha-value>)',
        },

        // Teacher accent (purple)
        teacher: {
          DEFAULT: 'rgb(var(--teacher) / <alpha-value>)',
          dark: 'rgb(var(--teacher-dark) / <alpha-value>)',
          darker: 'rgb(var(--teacher-darker) / <alpha-value>)',
        },

        // Pink (piggy, confetti)
        pink: {
          DEFAULT: 'rgb(var(--pink) / <alpha-value>)',
          light: 'rgb(var(--pink-light) / <alpha-value>)',
          dark: 'rgb(var(--pink-dark) / <alpha-value>)',
        },

        // Greens (nature, success)
        success: 'rgb(var(--success) / <alpha-value>)',
        'green-light': 'rgb(var(--green-light) / <alpha-value>)',
        'green-mid': 'rgb(var(--green-mid) / <alpha-value>)',
        'green-leaf': 'rgb(var(--green-leaf) / <alpha-value>)',

        // Sand & earth
        sand: {
          DEFAULT: 'rgb(var(--sand) / <alpha-value>)',
          dark: 'rgb(var(--sand-dark) / <alpha-value>)',
        },
        brown: {
          DEFAULT: 'rgb(var(--brown) / <alpha-value>)',
          dark: 'rgb(var(--brown-dark) / <alpha-value>)',
        },

        // Skin tones (SVG characters)
        skin: {
          DEFAULT: 'rgb(var(--skin) / <alpha-value>)',
          dark: 'rgb(var(--skin-dark) / <alpha-value>)',
          blush: 'rgb(var(--skin-blush) / <alpha-value>)',
        },

        // Navy (used as foreground on gold buttons)
        navy: '#1A1B4B',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
};