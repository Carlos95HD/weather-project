module.exports = {
  purge: {
    enabled: true,
    content: ['./src/index.html', './src/index.js']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily:{
        'bebas-neue':['Bebas Neue'],
        'monserrat':['Montserrat']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
