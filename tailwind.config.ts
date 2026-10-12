import type { Config } from "tailwindcss";

// Palette sampled from the reference: warm cream paper, deep maroon, antique gold, cocoa text.
const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: { DEFAULT: "#FAF3E3", warm: "#F6E8D0", deep: "#EEDBB9", paper: "#FFFBF1" },
        peach: { DEFAULT: "#FBE5CF", deep: "#F5CFB0" },
        maroon: { DEFAULT: "#7E0D1F", deep: "#5C1219", night: "#3F0C12", soft: "#9B3042" },
        gold: { DEFAULT: "#B8862F", light: "#D9B56A", soft: "#E6CD98", deep: "#94691D" },
        ink: { DEFAULT: "#4A2A22", soft: "#7A5A50" },
      },
      fontFamily: {
        script: ['"Great Vibes"', "cursive"],
        display: ["Cinzel", "Georgia", "serif"],
        heading: ['"Playfair Display"', "Georgia", "serif"],
        body: ['"Cormorant Garamond"', "Georgia", "serif"],
        devanagari: ['"Noto Serif Devanagari"', "serif"],
      },
      boxShadow: {
        card: "0 10px 26px -14px rgba(92, 18, 25, 0.45)",
        soft: "0 5px 14px -8px rgba(92, 18, 25, 0.4)",
      },
      keyframes: {
        sway: { "0%, 100%": { transform: "rotate(-1.5deg)" }, "50%": { transform: "rotate(1.5deg)" } },
        flame: {
          "0%, 100%": { opacity: "0.55", transform: "scale(0.9)" },
          "30%": { opacity: "1", transform: "scale(1.12)" },
          "60%": { opacity: "0.7", transform: "scale(0.96)" },
        },
        twinkle: { "0%, 100%": { opacity: "0.15", transform: "scale(0.6)" }, "50%": { opacity: "1", transform: "scale(1)" } },
        float: { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-5px)" } },
        bob: { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(5px)" } },
        shimmer: { "0%": { backgroundPosition: "200% 50%" }, "100%": { backgroundPosition: "-200% 50%" } },
        fall: {
          "0%": { transform: "translate3d(0, -6%, 0) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "0.9" },
          "100%": { transform: "translate3d(40px, 520px, 0) rotate(320deg)", opacity: "0" },
        },
        shine: { "0%, 55%": { transform: "translateX(-130%) skewX(-18deg)" }, "100%": { transform: "translateX(260%) skewX(-18deg)" } },
        ripple: { "0%": { transform: "scale(0.5)", opacity: "0.7" }, "100%": { transform: "scale(2.4)", opacity: "0" } },
      },
      animation: {
        sway: "sway 7s ease-in-out infinite",
        flame: "flame 1.8s ease-in-out infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
        float: "float 4.5s ease-in-out infinite",
        bob: "bob 1.8s ease-in-out infinite",
        shimmer: "shimmer 7s linear infinite",
        fall: "fall 12s linear infinite",
        shine: "shine 5s ease-in-out infinite",
        ripple: "ripple 2.4s ease-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
