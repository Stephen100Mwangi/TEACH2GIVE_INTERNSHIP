/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: '#E9EED9',
        // card: '#FEF9F2',
        card: '#F9F9F9',
        blue: '#0D92F4',
        black: '#000000',
        orange: '#FF6500',
        pink: '#FF77B7',
        yellow: '#FCCD2A',
      },
    },
  },
  plugins: [],
};
