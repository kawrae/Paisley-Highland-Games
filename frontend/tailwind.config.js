/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        highland: {
          50:"#f2fbf6",100:"#e4f6ea",200:"#c6ebd4",300:"#98dcb5",400:"#5fc786",
          500:"#36ad63",600:"#238a4d",700:"#1f6e40",800:"#1b5836",900:"#143f28"
        },
        heather: "#7a8b9a",
        tartan:  "#1b5836"
      },
      boxShadow: { soft: "0 10px 30px rgba(0,0,0,.06)" },
      backgroundImage: { "hero-gradient": "linear-gradient(to bottom, #e4f6ea 0%, #ffffff 65%)" }
    }
  },
  plugins: [],
}