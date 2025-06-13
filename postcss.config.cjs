module.exports = {
  plugins: [
    require("@tailwindcss/postcss")(), // ✅ Esto es lo correcto para Tailwind v4
    require("autoprefixer"),
  ],
};
