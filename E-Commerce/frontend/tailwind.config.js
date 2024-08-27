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
    },
  },
  plugins: [],
};
