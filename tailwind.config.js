module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    extend: {
      colors: {
        primary: "#0062cc",
        secondary: "#233044",
        info: "#17a2b8",
        success: "#28a745",
        warning: "#ffc107",
        danger: "#dc3545",
        dark: "#343a40",
      },
    },
  },
  variants: {
    extend: {
      borderRadius: ["hover", "focus"],
      transitionDuration: ["hover", "focus"],
      transform: ["hover", "focus"],
    },
  },
  plugins: [],
};
