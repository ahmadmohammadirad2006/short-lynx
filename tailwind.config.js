/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html', './public/js/script.js'],
  theme: {
    extend: {},
    colors: {
      mainBlue: '#1061FF',
      white: '#FFFFFF',
      selagoLight: '#F4F1F4',
      black: '#000000',
      gray: '#7E7E7E',
      red: '#ff3333',
    },
    fontFamily: {
      inter: ['Inter', ' sans-serif'],
    },
  },
  safelist: ['hidden', 'alert-success', 'alert-error'],
  plugins: [],
};
