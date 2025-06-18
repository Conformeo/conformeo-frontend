/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts,scss}',
  ],
  theme: {
    extend: {
      colors: {
        primary:   'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        danger:    'var(--color-danger)',
      },
    },
  },
  plugins: [],
};
