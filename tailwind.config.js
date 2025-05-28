/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray1: "#232626",
        gray2: "#323738",
        gray3: "#3D4445",
        squareGray: "#444C4D",
        darkGray: "#232626",

        normalGray: "#323738",
        lightGray: "#b3bec1",
        primary: "#3A4142",
        white: "#ffffff",
      },
    },
    // backgroundColor: { primary: "#c11c44" },
  },
  plugins: [],
};
