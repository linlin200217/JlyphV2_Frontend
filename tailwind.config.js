/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-green': '#274E13',
      },
      boxShadow: {
        '3xl': '15px 15px 12px 1px rgba(39,78,19,0.6)',
      }
    },
  },
  plugins: [],
}

