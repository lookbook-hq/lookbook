const lookbookTheme = require("./theme.json");

module.exports = {
  content: [
    "./app/views/**/*.html.erb",
    "./app/components/**/*.css",
    "./app/components/**/*.html.erb",
    "./app/components/**/*.rb",
    "./app/components/**/*.js",
    "./app/assets/**/*.js",
    "./app/controllers/**/*.rb",
    "./test/components/**/*.rb",
    "./test/components/**/*.html.erb",
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      colors: {
        ...lookbookTheme,
      },
      fontFamily: {
        mono: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
        sans: '"Nunito Sans", -apple-system, ".SFNSText-Regular", "San Francisco", BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif',
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
