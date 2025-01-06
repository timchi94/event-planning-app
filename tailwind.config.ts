import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    width: {
      desktop: '72rem'
    },
    extend: {
      fontFamily: {
        serif: [
          "Playwrite IS",
          "Times New Roman"
        ],
        sans: [
          "Raleway",
          "Helvetica",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
