/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  // production-ready content globs
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  // `mode: 'jit'` is not needed for Tailwind v3+
  darkMode: "class", // optional: use `class`-based dark mode

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
        rajdhani: ["saira", "sans-serif"],
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

        /* shimmer / shine keyframes for ShinyText */
        shine: {
          // animate the top gradient layer left-to-right across the text
          "0%": { "background-position": "200% 0, 0 0" },
          "100%": { "background-position": "-200% 0, 0 0" },
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

        /* shine animation. uses CSS variable --shine-duration (fallback 5s) */
        shine: "shine var(--shine-duration, 5s) linear infinite",
      },
    },
  },

  // Extend variants so animation utilities respond to prefers-reduced-motion
  variants: {
    extend: {
      animation: ["motion-reduce"],
      transitionDuration: ["motion-reduce"],
      transform: ["motion-reduce"],
    },
  },

  plugins: [
    require("tailwind-scrollbar"),

    // Performance helper plugin:
    // - Adds global selectors that quickly disable or scale back animation/transition/scroll behaviors
    // - Useful with the `document.documentElement.classList.add('reduced-performance')` pattern used in your App
    plugin(function ({ addUtilities }) {
      addUtilities(
        {
          /* When <html class="reduced-performance"> is set we:
             - turn off animations/transitions for children
             - force scroll-behavior to auto (avoid smooth scrolling CPU cost)
             - reduce potential background-attachment GPU cost
          */
          "html.reduced-performance, html.reduced-performance *": {
            "animation-duration": "0.001s !important",
            "animation-delay": "0s !important",
            "animation-iteration-count": "1 !important",
            "animation-play-state": "paused !important",
            transition: "none !important",
            "scroll-behavior": "auto !important",
            "background-attachment": "scroll !important",
            "will-change": "auto !important",
          },

          /* a utility you can add selectively to root to indicate low-power fallback */
          ".reduced-performance-fallback": {
            "pointer-events": "none",
            "user-select": "none",
          },
        },
        {
          // generate as-is (these keys are full selectors)
          variants: ["responsive"],
        }
      );
    }),

    // small helper: create motion-safe / motion-reduce shorthand utilities (optional)
    plugin(function ({ matchUtilities, theme }) {
      // Example: use `motion-reduce:animate-none` in markup if needed (Tailwind already supports motion-safe/reduce variants)
      matchUtilities(
        {
          "animate-preserve": (value) => ({
            animation: value,
          }),
        },
        { values: theme("animation") }
      );
    }),
  ],
};
