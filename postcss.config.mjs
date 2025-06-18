// postcss.config.js
module.exports = {
  plugins: [
    require('@tailwindcss/postcss')({
      // charge votre fichier tailwind.config.js par défaut
      // (optionnel)  tailwindConfig: './tailwind.config.js',
    }),
    require('autoprefixer'),
  ],
};
