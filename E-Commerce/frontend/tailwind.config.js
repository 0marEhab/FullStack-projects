/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Merriweather: ["Merriweather"],
        Anton: ["Anton"],
        Playfair: ["Playfair"],
        Roboto: ["Roboto"],
      },
      screens: {
        "2xl": "2499px", // Custom 2K screen breakpoint
      },
      colors: {
        primary: "#F0F8FF",
        products: "#FBFCF8",
      },
    },
  },
  plugins: [],
};
