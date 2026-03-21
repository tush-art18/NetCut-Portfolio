/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit:   ['Outfit', 'sans-serif'],
        bebas:    ['Bebas Neue', 'cursive'],
        grotesk:  ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        cinema: {
          orange: '#f97316',
          dark:   '#0a0a0a',
        }
      },
      letterSpacing: {
        'cinematic': '0.25em',
      },
    },
  },
  plugins: [],
}
