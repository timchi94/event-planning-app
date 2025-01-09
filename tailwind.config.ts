import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    width: {
      desktop: '72rem'
    },
    colors: {
      greenPrimary: '#D1FAE5',
      pinkPrimary: '#ED6D8B',
      grayPrimary: '#1F2937',
      graySecondary: '#E5E7EB'
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
