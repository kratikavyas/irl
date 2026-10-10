/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: "#FCFAF7",
          100: "#FAF7F2",
          200: "#F4EFE6",
          300: "#EAE2D5",
          400: "#DDD2C1",
        },
        burgundy: {
          50: "#FAF0F3",
          100: "#F5DDE4",
          200: "#E9B8C6",
          300: "#D78DA2",
          400: "#BE5F79",
          500: "#982846",
          600: "#7E1A36",
          700: "#641229",
          800: "#4A0B1D",
          900: "#340614",
          950: "#20020B",
        },
        champagne: {
          50: "#FDFBF7",
          100: "#FAF4E8",
          200: "#F4E8D0",
          300: "#E9D4AE",
          400: "#D6B87D",
          500: "#C49E58",
          600: "#A88340",
          700: "#866630",
        },
        terracotta: {
          50: "#FCF4F1",
          100: "#F8E5DF",
          200: "#F0C7BA",
          500: "#C25D42",
          600: "#A74930",
        },
        sand: {
          100: "#F7F2EB",
          200: "#ECE3D7",
          300: "#DDD2C2",
          400: "#C9BCAB",
        },
        stone: {
          850: "#1C1917",
          950: "#12100E",
        }
      },
      fontFamily: {
        serif: ["Newsreader", "Cormorant Garamond", "Playfair Display", "Georgia", "Cambria", "serif"],
        sans: ["Plus Jakarta Sans", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        'editorial': '0 2px 14px -2px rgba(45, 9, 21, 0.04), 0 1px 4px -1px rgba(45, 9, 21, 0.02)',
        'editorial-lg': '0 12px 36px -6px rgba(45, 9, 21, 0.08), 0 4px 12px -2px rgba(45, 9, 21, 0.03)',
        'editorial-xl': '0 24px 64px -12px rgba(32, 2, 11, 0.16), 0 8px 24px -4px rgba(32, 2, 11, 0.06)',
        'champagne-glow': '0 0 20px -2px rgba(196, 158, 88, 0.25)',
      },
      letterSpacing: {
        'widest-editorial': '0.18em',
      }
    },
  },
  plugins: [],
};
