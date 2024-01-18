/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Website colors here
        primary: "#FF5757",
        secondary: "#002147",
        customGreen: "#00CD90",
      },
      daisyui: {
        themes: ["light", "dark", "cupcake"],
      },
    },
  },
  plugins: [require("daisyui")],
};

