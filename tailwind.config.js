/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',

  theme: {
    extend: {
      fontFamily: {
        'poppins-regular': ['Poppins_400Regular'],
        'poppins-medium': ['Poppins_500Medium'],
        'poppins-semibold': ['Poppins_600SemiBold'],
        'poppins-bold': ['Poppins_700Bold'],
        fredoka: ['Fredoka_700Bold'],
      },

      colors: {
        /* ── Core semantic tokens ── */

        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',

        card: {
          DEFAULT: 'rgb(var(--card) / <alpha-value>)',
          foreground: 'rgb(var(--card-foreground) / <alpha-value>)',
        },

        popover: {
          DEFAULT: 'rgb(var(--popover) / <alpha-value>)',
          foreground: 'rgb(var(--popover-foreground) / <alpha-value>)',
        },

        primary: {
          DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
          foreground: 'rgb(var(--primary-foreground) / <alpha-value>)',
        },

        secondary: {
          DEFAULT: 'rgb(var(--secondary) / <alpha-value>)',
          foreground: 'rgb(var(--secondary-foreground) / <alpha-value>)',
        },

        muted: {
          DEFAULT: 'rgb(var(--muted) / <alpha-value>)',
          foreground: 'rgb(var(--muted-foreground) / <alpha-value>)',
        },

        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          foreground: 'rgb(var(--accent-foreground) / <alpha-value>)',
        },

        destructive: {
          DEFAULT: 'rgb(var(--destructive) / <alpha-value>)',
          foreground: 'rgb(var(--destructive-foreground) / <alpha-value>)',
        },

        success: 'rgb(var(--success) / <alpha-value>)',
        warning: 'rgb(var(--warning) / <alpha-value>)',
        info: 'rgb(var(--info) / <alpha-value>)',

        border: 'rgb(var(--border) / <alpha-value>)',
        input: 'rgb(var(--input) / <alpha-value>)',
        ring: 'rgb(var(--ring) / <alpha-value>)',

        /* ── Chart colors ── */
        'chart-1': 'rgb(var(--chart-1) / <alpha-value>)',
        'chart-2': 'rgb(var(--chart-2) / <alpha-value>)',
        'chart-3': 'rgb(var(--chart-3) / <alpha-value>)',
        'chart-4': 'rgb(var(--chart-4) / <alpha-value>)',
        'chart-5': 'rgb(var(--chart-5) / <alpha-value>)',

        gradient: {
          start: 'rgb(var(--gradient-start) / <alpha-value>)',
          mid: 'rgb(var(--gradient-mid) / <alpha-value>)',
          end: 'rgb(var(--gradient-end) / <alpha-value>)',
        },

        /* ── Gold CTA ── */
        gold: {
          DEFAULT: 'rgb(var(--gold) / <alpha-value>)',
          dark: 'rgb(var(--gold-dark) / <alpha-value>)',
          darker: 'rgb(var(--gold-darker) / <alpha-value>)',
          deep: 'rgb(var(--gold-deep) / <alpha-value>)',
        },

        /* ── Student (sky-blue) ── */
        student: {
          DEFAULT: 'rgb(var(--student) / <alpha-value>)',
          dark: 'rgb(var(--student-dark) / <alpha-value>)',
        },

        /* ── Teacher (purple) ── */
        teacher: {
          DEFAULT: 'rgb(var(--teacher) / <alpha-value>)',
          dark: 'rgb(var(--teacher-dark) / <alpha-value>)',
          darker: 'rgb(var(--teacher-darker) / <alpha-value>)',
        },

        /* ── Pink accent (Nigel brand) ── */
        pink: {
          DEFAULT: 'rgb(var(--pink) / <alpha-value>)',
          light: 'rgb(var(--pink-light) / <alpha-value>)',
          dark: 'rgb(var(--pink-dark) / <alpha-value>)',
        },

        green: {
          light: 'rgb(var(--green-light) / <alpha-value>)',
          mid: 'rgb(var(--green-mid) / <alpha-value>)',
          leaf: 'rgb(var(--green-leaf) / <alpha-value>)',
        },

        /* ── Earth tones ── */
        sand: {
          DEFAULT: 'rgb(var(--sand) / <alpha-value>)',
          dark: 'rgb(var(--sand-dark) / <alpha-value>)',
        },

        brown: {
          DEFAULT: 'rgb(var(--brown) / <alpha-value>)',
          dark: 'rgb(var(--brown-dark) / <alpha-value>)',
        },

        /* ── Skin tones ── */
        skin: {
          DEFAULT: 'rgb(var(--skin) / <alpha-value>)',
          dark: 'rgb(var(--skin-dark) / <alpha-value>)',
          blush: 'rgb(var(--skin-blush) / <alpha-value>)',
        },

        /* ── Semantic status ── */
        info: 'rgb(var(--info) / <alpha-value>)',
        warning: 'rgb(var(--warning) / <alpha-value>)',
        error: 'rgb(var(--error) / <alpha-value>)',

        /* ── Stat card accents ── */
        streak: 'rgb(var(--streak) / <alpha-value>)',
        balance: 'rgb(var(--balance) / <alpha-value>)',
        rank: 'rgb(var(--rank) / <alpha-value>)',

        'white-alpha': {
          5: 'rgba(255, 255, 255, 0.05)',
          10: 'rgba(255, 255, 255, 0.10)',
          15: 'rgba(255, 255, 255, 0.15)',
          20: 'rgba(255, 255, 255, 0.20)',
          30: 'rgba(255, 255, 255, 0.30)',
          40: 'rgba(255, 255, 255, 0.40)',
          50: 'rgba(255, 255, 255, 0.50)',
          60: 'rgba(255, 255, 255, 0.60)',
          75: 'rgba(255, 255, 255, 0.75)',
          85: 'rgba(255, 255, 255, 0.85)',
          90: 'rgba(255, 255, 255, 0.90)',
        },

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
