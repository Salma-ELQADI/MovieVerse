module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brown palette — used as CSS vars for easy reuse
        cream: "#f5ede0",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 24px 0 rgba(120, 53, 15, 0.18)",
        "card-hover": "0 8px 32px 0 rgba(217, 119, 6, 0.25)",
      },
    },
  },
  plugins: [],
};
