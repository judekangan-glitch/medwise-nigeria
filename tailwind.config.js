/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2C5F2D',
          light: '#3D7A3E',
          dark: '#1F4521',
        },
        accent: {
          DEFAULT: '#F96167',
          light: '#FA7A7F',
          dark: '#D8454A',
        },
        medical: {
          blue: '#4A90E2',
          green: '#50C878',
        },
        deep: {
          green: '#091C10',
          surface: '#0D2818',
          border: '#1A3C26'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
