/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00A86B",
          dark: "#008000",
        },
        neutral: {
          light: "#F5F5F5",
          dark: "#333333",
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        lg: "12px",
      }
    },
  },
  plugins: [
    require("tailwindcss-animate")
  ],
}