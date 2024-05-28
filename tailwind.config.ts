import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/helper/*.{js,ts,jsx,tsx,mdx}",
    "./src/provider/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "birch-wood": "#ddc5a2",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { color: "#000" },
          "50%": { color: "#555" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "1" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
      },
      animation: {
        "text-pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        ripple: "ripple 600ms linear",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
