/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Overpass'], // Corrigido de "Ovespass" para "Overpass"
      },
      colors: {
        sidebar: "#171D22",
        body: "#171D25",
        utils: "#25272D",
        utilsText: "#4D4E53",
      },
    },
  },
  plugins: [],
};