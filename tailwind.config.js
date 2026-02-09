/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0a9f6c",
          light: "#ecfdf5",
          dark: "#059669",
        },
      },
    },
  },
  plugins: [],
};
