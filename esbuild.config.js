const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["app/assets/lookbook/js/app.js"],
    bundle: true,
    target: "es2016",
    watch: process.env.NODE_ENV === "development",
    outfile: "public/lookbook-assets/app.js",
  })
  .catch(() => process.exit(1));
