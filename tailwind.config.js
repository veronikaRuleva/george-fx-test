/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      inter: ['"Inter"', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        "george-blue": {
          300: "#1d69ec",
        },
        white: "#ffffff",
        indigo: "#2f2d91",
        ...defaultTheme.colors,
      },
    },
  },
  plugins: [],
};
