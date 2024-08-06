import { nextui } from '@nextui-org/react'
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      gridTemplateColumns: {
        'grid-large': '100px 1fr 100px',
        'grid-medium': '50px 1fr 50px',
        'grid-small': '1fr',
      },
      gridColumn: {
        'column-large': '2/3',
        'column-medium': '2/-1',
        'column-small|full': '1/-1',
      },
      screens: {
        'mobile': { 'max': '640px' },
        'smMobile': { 'max': '420px' },
        'tablet': { 'max': '1025px' }
        // => @media (max-width: 639px) { ... }
      },
      backgroundImage: {
        'bgc-light': 'linear-gradient(to left ,#f2b0bc, #b0d1f2)',
        'bgc-dark':
          'linear-gradient(33deg, rgba(10,6,68,1) 26%, rgba(69,10,10,1) 76%);',
      },

      colors: {
        'green': '#008000',
        'light-green': '#90EE90',
        'red': '#B22222',
        'app-red': '#f2b0bc',
        'app-blue': '#b0d1f2',

      },
      keyframes: {
        scrollMessages: {
          '0%': { transform: 'translateY(0)' },
          // '25%': { transform: 'translateY(-25%)' },
          '50%': { transform: 'translateY(-100%)' },
          // '75%': { transform: 'translateY(50%)' },
          '100%': { transform: 'translateY(100%)' },
        }
      },
      animation: {
        scrollMsg: 'scrollMessages 10s linear infinite'
      },

    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    nextui({
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {} // light theme colors
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {
            foreground: '#FFFFFF', // forground is default text color
          } // dark theme colors,
        },
      }
    })
  ],
}

