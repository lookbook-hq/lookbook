const lookbookTheme = require("./theme/theme.json");
const tailwindDefaults = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      colors: {
        ...lookbookTheme,
      },
      fontFamily: {
        sans: ["Inter var", ...tailwindDefaults.fontFamily.sans],
        mono: ["Source Code Variable", ...tailwindDefaults.fontFamily.mono],
        prose: ["Nunito Sans", ...tailwindDefaults.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
  content: [
    "./app/views/**/*.html.erb",
    "./app/components/**/*.html.erb",
    "./app/components/**/*.rb",
    "./app/components/**/*.js",
    "./app/assets/**/*.js",
    "./app/controllers/**/*.rb",
    "./spec/components/**/*.rb",
    "./spec/components/**/*.html.erb",
  ],
  safelist: [".lookbook-panel"],
};
