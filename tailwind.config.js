/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './sections/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          light: '#f8fafc', // Light background color
          dark: '#1e1e2f', // Dark background color
        },
        text: {
          light: '#1e1e2f', // Light text color
          dark: '#f8fafc', // Dark text color
        },
      },
    },
  },
  plugins: [],
};
