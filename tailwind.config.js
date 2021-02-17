module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    extend: {
      colors: {
        "main-blue": "#233044",
        "main-pink": "#ffa7c4",
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
