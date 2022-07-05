module.exports = {
  plugins: {
    "postcss-import": {},
    "tailwindcss/nesting": {},
    tailwindcss: {},
    "postcss-flexbugs-fixes": {},
    "postcss-preset-env": {
      features: { "nesting-rules": false },
      autoprefixer: {
        flexbox: "no-2009",
      },
      stage: 2,
    },
  },
};
