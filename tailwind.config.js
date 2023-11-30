/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily:{
      inspiration: ["Inspiration","cursive"],
      jockey : ["Jockey One","sans-seri"],
      barlow: ['Barlow Semi Condensed', 'sans-serif'],
      poppins: ['Poppins','sans-serif']
    }
  },
  plugins: [],
}

