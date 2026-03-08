import svg from "@poppanator/sveltekit-svg";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^\@components\/(.*)$/,
        replacement: resolve(__dirname, "app/frontend/lookbook/components/$1.svelte"),
      },
      {
        find: /^\@lib\/(.*)$/,
        replacement: resolve(__dirname, "app/frontend/lookbook/lib/$1.svelte.js"),
      },
      {
        find: /^\@styles\/(.*)$/,
        replacement: resolve(__dirname, "app/frontend/lookbook/styles/$1.css"),
      },
    ],
  },
  build: {
    root: "app/frontend/lookbook/entrypoints/",
    rollupOptions: {
      input: {
        ui: "app/frontend/lookbook/entrypoints/ui.html",
      },
      output: {
        entryFileNames: "lookbook-assets/[name]-[hash].js",
        chunkFileNames: "lookbook-assets/[name]-[hash].js",
        assetFileNames: "lookbook-assets/[name]-[hash].[ext]",
      },
    },
    outDir: "dist",
    assetsDir: "lookbook-assets",
    manifest: "manifest.json",
    cssCodeSplit: true,
    sourcemap: false,
    minify: false,
    cssMinify: true,
  },
  plugins: [
    svelte({
      configFile: "./svelte.config.js",
    }),
    svg({
      includePaths: ["./app/frontend/lookbook/images/"],
    }),
  ],
});
