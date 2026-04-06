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
          DEFAULT: '#10B981', // Vibrant Emerald 500
          light: '#34D399',   // Emerald 400
          dark: '#059669',    // Emerald 600
        },
        accent: {
          DEFAULT: '#F43F5E', // Vibrant Rose 500
          light: '#FB7185',   // Rose 400
          dark: '#E11D48',    // Rose 600
        },
        medical: {
          blue: '#3B82F6',    // Bright Blue 500
          teal: '#14B8A6',    // Teal 500
        },
        deep: {
          green: '#064E3B',   // Emerald 900 (Rich, not black)
          surface: '#065F46', // Emerald 800
          border: '#10B981'   // Emerald 500 (Glow)
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
