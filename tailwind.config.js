/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html', 
    './stylesheets/styles.css',
     './stylesheets/favorites.css',
      './modules/createCard.js',
       './modules/favorites.js',
        './main.js',
      './modules/showBloodStatus.js'
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
