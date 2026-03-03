import { svelte } from "@sveltejs/vite-plugin-svelte";
import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^\@components\/(.*)$/,
        replacement: resolve(
          __dirname,
          "app/frontend/lookbook/components/$1.svelte",
        ),
      },
      {
        find: /^\@lib\/(.*)$/,
        replacement: resolve(
          __dirname,
          "app/frontend/lookbook/lib/$1.svelte.js",
        ),
      },
    ],
  },
  build: {
    lib: {
      entry: [
        resolve(__dirname, "app/frontend/lookbook/entrypoints/ui.js"),
        resolve(__dirname, "app/frontend/lookbook/entrypoints/ui-base.css"),
      ],
      formats: ["es"],
    },
    cssCodeSplit: true,
    sourcemap: false,
    minify: false,
    cssMinify: true,
    outDir: "dist/lookbook-assets",
  },
  plugins: [
    svelte({
      configFile: "./svelte.config.js",
    }),
  ],
});
