import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  "#fdf8ee",
          100: "#f8edcf",
          200: "#f0d89a",
          300: "#e8c065",
          400: "#dea83c",
          500: "#c9902a",
          600: "#a87022",
          700: "#845220",
          800: "#6b4121",
          900: "#59361f",
        },
        accent: "#c9a96e",
        "accent-light": "#e8c98a",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(20px, -30px) scale(1.05)" },
          "66%": { transform: "translate(-15px, 15px) scale(0.95)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out forwards",
        blob: "blob 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
