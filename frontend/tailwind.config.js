/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        't-xl': '0 -10px 10px rgba(0, 0, 0, 0.25)',
        't-md': '0 -5px 5px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
}

