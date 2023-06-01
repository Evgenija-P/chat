/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      colors: {
        'prime-color': '#fff',
        'accent-red': '#cb0e0e',
        'accent-blue': '#036cca',
      },
    },
  },
  plugins: [],
};
