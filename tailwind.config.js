module.exports = {
  mode: "jit",
  purge: ["./app/views/**/*.html.erb", "./app/assets/**/*.js", "./app/controllers/**/*.rb"],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        monospace: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
        sans: '"Nunito Sans", -apple-system, ".SFNSText-Regular", "San Francisco", BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
