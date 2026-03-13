import { defineConfig } from "vite";
import rails from "rails-vite-plugin";

export default defineConfig({
  plugins: [
    rails({
      sourceDir: "app/frontend",
    }),
  ],
});
