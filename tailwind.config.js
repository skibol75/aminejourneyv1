/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neutral: {
          850: '#1e1e1e',
          900: '#232323',
          800: '#2a2a2a',
          700: '#303030',
          600: '#3a3a3a',
          500: '#444444',
          400: '#b0b0b0',
          300: '#f3f3f3',
        },
      },
    },
  },
  plugins: [],
};