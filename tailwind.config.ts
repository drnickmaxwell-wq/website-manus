import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./contexts/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      /* === SMH token mapping === */
      colors: {
        smh: {
          magenta: "var(--smh-primary-magenta)",
          teal: "var(--smh-primary-teal)",
          gold: "var(--smh-accent-gold)",
          bg: "var(--smh-bg)",
          text: "var(--smh-text)",
          textDim: "var(--smh-text-muted)",
        },
      },
      boxShadow: {
        "smh-gold": "var(--glow-gold)",
        "smh-light": "var(--shadow-elevate-light)",
        "smh-dark": "var(--shadow-elevate-dark)",
      },
      fontFamily: {
        heading: "var(--font-heading)",
        body: "var(--font-body)",
        data: "var(--font-data)",
      },
    },
  },
  plugins: [],
};

export default config;
