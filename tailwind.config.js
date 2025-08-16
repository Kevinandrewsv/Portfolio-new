/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        primary: "#000000ff",
        secondary: "#aaa6c3",
        tertiary: "#151030a9",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",

        // rainbow color tokens (for gradient animation using HSL vars)
        "color-1": "hsl(var(--color-1))",
        "color-2": "hsl(var(--color-2))",
        "color-3": "hsl(var(--color-3))",
        "color-4": "hsl(var(--color-4))",
        "color-5": "hsl(var(--color-5))",
      },
      fontFamily: {
        rajdhani: ['saira', 'sans-serif'],
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },

      /* existing keyframes */
      keyframes: {
        "spin-reverse": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
        // rainbow keyframes
        rainbow: {
          "0%": { "background-position": "0%" },
          "100%": { "background-position": "200%" },
        },

        /* star movement keyframes (for StarBorder) */
        "star-movement-bottom": {
          "0%": { transform: "translate(0%, 0%)", opacity: "1" },
          "100%": { transform: "translate(-100%, 0%)", opacity: "0" },
        },
        "star-movement-top": {
          "0%": { transform: "translate(0%, 0%)", opacity: "1" },
          "100%": { transform: "translate(100%, 0%)", opacity: "0" },
        },
      },

      /* animations */
      animation: {
        "spin-slow": "spin 4s linear infinite",
        "spin-reverse-slow": "spin-reverse 4s linear infinite",

        // rainbow animation (uses --speed, defaults to 2s)
        rainbow: "rainbow var(--speed, 2s) infinite linear",

        /* star-movement animations used by StarBorder */
        "star-movement-bottom": "star-movement-bottom linear infinite alternate",
        "star-movement-top": "star-movement-top linear infinite alternate",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
