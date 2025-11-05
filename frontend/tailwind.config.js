/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        highland: {
          50:  "#f0fdfc",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a"
        },
        heather: "#7a8b9a",
        tartan: "#1b5836",

        dark: {
          bg: "#0f172a",
          card: "#1e293b",
          border: "#334155",
          text: "#e2e8f0",
          accent: "#36ad63",
        },
      },

      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,.06)",
        softDark: "0 10px 30px rgba(0,0,0,.3)",
      },

      backgroundImage: {
        "hero-gradient": "linear-gradient(to bottom, #e4f6ea 0%, #ffffff 65%)",
        "hero-gradient-dark": "linear-gradient(to bottom, #0f172a 0%, #1e293b 65%)",
      },
    },
  },
  plugins: [],
};
