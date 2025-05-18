/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#2A4B7C',
        secondary: '#F9F9F9',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}