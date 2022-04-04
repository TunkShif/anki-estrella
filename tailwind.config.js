const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        levander: "#e6e9eb",
        "anki-blue": "#03a9f4"
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        display: ["Outfit", "sans-serif"]
      }
    }
  },
  plugins: [require("@tailwindcss/forms"), require("tailwindcss-radix")()]
}
