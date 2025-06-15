module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}",
  ],
  theme: {
    extend: {
      colors: {
        primary:   'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        // …
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      spacing: {
        'spacer': '1rem'
      }
    },
  },
  plugins: [],
};
