import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
darkMode: [

],
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
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'green': '#008000',
        'light-green': '#90EE90',
        'red': '#B22222',
        'app-red': '#f2b0bc',
        'app-blue': '#b0d1f2',
        'app-background': '#49c5b6'
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
    require('@tailwindcss/forms')
  ],
}
export default config
