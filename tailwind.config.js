/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FFFFFF",
        ink: "#111111",
        grid: "#E5E7EB",
        cyan: "#00D1FF",
        link: "#005BC5",
        incident: "#EF4444",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      borderRadius: {
        none: "0px",
        DEFAULT: "0px",
      },
      keyframes: {
        "radar-pulse": {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(2.6)", opacity: "0" },
        },
        "blink-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.25" },
        },
        glitch: {
          "0%": { transform: "translate(0,0)" },
          "20%": { transform: "translate(-3px,2px)" },
          "40%": { transform: "translate(3px,-2px)" },
          "60%": { transform: "translate(-2px,-2px)" },
          "80%": { transform: "translate(2px,2px)" },
          "100%": { transform: "translate(0,0)" },
        },
      },
      animation: {
        "radar-pulse": "radar-pulse 2.4s cubic-bezier(0.2,0.6,0.4,1) infinite",
        "blink-dot": "blink-dot 1.6s ease-in-out infinite",
        glitch: "glitch 0.2s steps(2) 1",
      },
    },
  },
  plugins: [],
};
