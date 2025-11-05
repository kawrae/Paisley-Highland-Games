/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        highland: {
          50: "#f0fdfc",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
        },
        heather: "#7a8b9a",
        tartan: "#1b5836",

        dark: {
          bg: "#06110e",
          card: "#0d1a17",
          border: "#1f3b34",
          text: "#d3ece1",
          muted: "#9fb7ab",
          accent: "#1b946f",
          accentHover: "#21b386",
          heading: "#b8f5d2",
        },
      },

      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,.06)",
        softDark: "0 10px 30px rgba(0,0,0,.2)",
      },

      backgroundImage: {
        "hero-gradient": "linear-gradient(to bottom, #e8f9f0 0%, #ffffff 70%)",

        "hero-gradient-dark":
          "linear-gradient(to bottom, #06524593 0%, #0e2e2cff 40%, #060e0bc4 100%)",
      },
    },
  },
  plugins: [],
};
