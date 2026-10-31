export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: { DEFAULT: '#14382f', light: '#1f5245' },
        cream: '#faf6ec',
        gold: { DEFAULT: '#b8975a', dark: '#8f7340' },
        charcoal: '#2b2b2b',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
