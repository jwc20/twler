/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-gray": "#D3D3D3",
        "gold-medal": "#FFD700",
        "silver-medal": "#C0C0C0",
        "bronze-medal": "#CD7F32",
      },
    },
  },
  plugins: [],
};
