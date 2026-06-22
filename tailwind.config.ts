import type { Config } from "tailwindcss";

/**
 * "The White Cube" design tokens.
 * The ENTIRE palette lives here — there is no other color in the UI.
 * All color in the app comes from the cigarette-box photography, never chrome.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Gallery white — every background
        white: "#FFFFFF",
        // Ink — primary text, hairlines, solid fills, pins
        ink: "#000000",
        // Secondary text — labels, metadata, captions
        secondary: "#6B6B6B",
        // Tertiary / muted — quietest captions, placeholders, hints
        muted: "#9A9A9A",
        // Faint hairline — the quiet dividers
        hairline: "#E6E6E6",
        // World-map country/coast borders
        "map-border": "#8C8C8C",
        // Inactive tab icons / labels
        inactive: "#B4B4B4",
        // Inactive toggle letters (Layout A/B)
        "toggle-off": "#C4C4C4",
        // Faintest frame strokes
        "frame-faint": "#DCDCDC",
        // Empty condition-dot ring
        "dot-empty": "#C9C9C9",
        // Body text that reads as near-black ink in the prototype
        body: "#1A1A1A",
      },
      fontFamily: {
        // Single family: Archivo (neo-grotesque stand-in for Neue Haas / Söhne),
        // loaded via <link> in the root layout.
        sans: ["Archivo", "system-ui", "sans-serif"],
      },
      maxWidth: {
        // Mobile-first column width (prototype reference ~402px)
        app: "430px",
      },
      keyframes: {
        // Pins fall in and settle — overshoot at 70%, then rest.
        pindrop: {
          "0%": {
            transform:
              "translate(-50%,-50%) translateY(-14px) scale(.4)",
            opacity: "0",
          },
          "70%": {
            transform: "translate(-50%,-50%) translateY(1px) scale(1.05)",
            opacity: "1",
          },
          "100%": {
            transform: "translate(-50%,-50%) scale(1)",
            opacity: "1",
          },
        },
        // Bottom cards / sheets slide up.
        sheetup: {
          from: { transform: "translateY(110%)" },
          to: { transform: "translateY(0)" },
        },
        // Screens enter: fade + small rise.
        fadeup: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        // Tab cross-fades and sub-view swaps.
        fade: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        pindrop: "pindrop .5s cubic-bezier(.2,.8,.25,1) both",
        sheetup: "sheetup .34s cubic-bezier(.2,.8,.25,1) both",
        fadeup: "fadeup .42s cubic-bezier(.2,.8,.25,1) both",
        fade: "fade .4s ease",
        "fade-fast": "fade .3s ease",
      },
    },
  },
  plugins: [],
};

export default config;
