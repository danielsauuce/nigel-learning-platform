/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Montserrat',
          'Poppins',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
      colors: {
        edulite: {
          purple: '#B9A7F8',
          peach: '#F9D6D0',
          navy: '#22223B',
          gray: '#6C6C80',
          bg: '#F8F6FB',
          pink: '#F7B6B6',
          yellow: '#F7E6B6',
          brand: '#E91E8C',
        },
      },
    },
  },
  plugins: [],
}
