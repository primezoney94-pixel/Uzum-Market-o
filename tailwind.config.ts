import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fff1f0",
          100: "#ffe0db",
          200: "#ffc5bc",
          300: "#ff9f91",
          400: "#ff6b57",
          500: "#ff3d26",
          600: "#ed2009",
          700: "#c81608",
          800: "#a5160d",
          900: "#881811",
          950: "#4b0804",
          DEFAULT: "#ed2009",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#7c3aed",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#f59e0b",
          foreground: "#1c1917",
        },
        background: "#f5f5f7",
        surface: "#ffffff",
        border: "#e5e7eb",
        muted: {
          DEFAULT: "#f3f4f6",
          foreground: "#6b7280",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#111827",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-plus-jakarta)", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        card: "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
        "card-hover": "0 8px 24px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
        primary: "0 4px 16px rgba(237, 32, 9, 0.3)",
        nav: "0 -2px 20px rgba(0,0,0,0.08)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        bounce: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
        shimmer: "shimmer 1.5s infinite linear",
        bounce: "bounce 0.3s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
