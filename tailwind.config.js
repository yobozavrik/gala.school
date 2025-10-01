/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'galya-brown': '#3D2617',
        'galya-brown-light': '#8B6F47',
        'galya-beige': '#F5E6D3',
        'galya-accent': '#D4A574',
      }
    },
  },
  plugins: [],
}