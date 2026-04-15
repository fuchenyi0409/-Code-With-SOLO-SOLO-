/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#06b6d4',
        secondary: '#14b8a6',
        dark: '#0f172a',
        'dark-light': '#1e293b',
        'dark-lighter': '#334155',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 15px rgba(6, 182, 212, 0.5)',
        'glow-lg': '0 0 25px rgba(6, 182, 212, 0.7)',
      },
    },
  },
  plugins: [],
}