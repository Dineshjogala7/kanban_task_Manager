/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,html}", // <-- Adjust based on your project structure
    "./public/index.html",            // If you use an HTML file
  ],
  darkMode:'class',
  theme: {
    extend: {},
  },
  plugins: [require('tailwind-scrollbar-hide')],
}

