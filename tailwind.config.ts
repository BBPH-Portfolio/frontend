import { transform } from "next/dist/build/swc";
import type { Config } from "tailwindcss";


const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        color1: "#ffffff",
      },
      keyframes: {
        reveal: {
          "0%": { transform: "translate(0, 100%)" },
          "100%": { transform: "translate(0, 0)" },
        },
      },
      animation: {
        reveal: "reveal 1.5s cubic-bezier(0.77, 0, 0.175, 1) 0.5s",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;