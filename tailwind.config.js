/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        roboto: ['Roboto',"sans-serif"]
      },
      colors:{
        dark: "#2D2D2D",
        primary: "#FFB347",
        somon: "#FFA07A",
      },
    },
  },
  plugins: [],
}