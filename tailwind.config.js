import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        starBlue: "#4facfe",
        starPurple: "#e68af5",
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            background: "#0f172a",
            foreground: "#f8fafc",
            primary: {
              50: "#eff6ff",
              100: "#dbeafe",
              200: "#bfdbfe",
              300: "#93c5fd",
              400: "#60a5fa",
              500: "#4facfe",
              600: "#2563eb",
              700: "#1d4ed8",
              800: "#1e40af",
              900: "#1e3a8a",
              DEFAULT: "#4facfe",
              foreground: "#ffffff"
            },
            secondary: {
              50: "#fdf4ff",
              100: "#fae8ff",
              200: "#f5d0fe",
              300: "#f0abfc",
              400: "#e879f9",
              500: "#e68af5",
              600: "#c026d3",
              700: "#a21caf",
              800: "#86198f",
              900: "#701a75",
              DEFAULT: "#e68af5",
              foreground: "#ffffff"
            },
          }
        }
      }
    })
  ]
}
