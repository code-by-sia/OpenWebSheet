/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx}',
  ],
  darkMode: 'media',
  theme: {

  },
  variants: {
    extend: {
      borderRadius: ['hover'],
      opacity: ['disabled'],
    }
  },
  plugins: [],
}
