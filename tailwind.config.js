/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow :{
        'customShadow' : '3px 3px 20px 3px gray',
    
      }
    },
  },
  plugins: [require("daisyui")],
}