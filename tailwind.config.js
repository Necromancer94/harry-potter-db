/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/**/*.html',
    './public/**/*.js',
    ],
  theme: {
    extend: {
      screens: {
        'mobile': { max: '768px' }, //@media max-width 768px
      },
      fontFamily: {
        'sans': ['"Public Sans"'],
      },
    },
  },
  plugins: [],
}
