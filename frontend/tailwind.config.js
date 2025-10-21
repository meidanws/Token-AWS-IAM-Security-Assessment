/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "aws-orange": "#FF9900",
        "aws-blue": "#232F3E",
      },
    },
  },
  plugins: [],
};
