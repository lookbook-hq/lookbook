module.exports = {
  content: [
    "./app/views/**/*.html.erb",
    "./app/assets/**/*.js",
    "./app/controllers/**/*.rb",
  ],
  theme: {
    extend: {
      fontFamily: {
        monospace:
          "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
        sans: '"Nunito Sans", -apple-system, ".SFNSText-Regular", "San Francisco", BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif',
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
