module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      placeholderOpacity: {
        10: "0.1",
        20: "0.2",
        95: "0.95",
      },
      keyframes: {
        low: {
          "0%, 100%": "opacity: 1",
          "50%": "opacity: 85%",
        },
      },
      animation: {
        smallpulse: "low 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
    placeholderColor: {
      primary: "#3490dc",
      secondary: "#ffed4a",
      danger: "#e3342f",
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/forms")],
};
