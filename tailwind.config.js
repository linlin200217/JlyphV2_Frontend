/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '9rem': '9rem',
      },
      height: {
        '4/5': '80%',
        '1/8': '12.5%',
        '1/10': '10%',
      },
      colors: {
        'dark-green': '#274E13',
        'light-green': '#97AB8A',
        'chat-background': '#B6D7A8'
      },
      boxShadow: {
        '3xl': '15px 15px 12px 1px rgba(39,78,19,0.6)',
      }
    },
  },
  plugins: [require("daisyui")],
}

