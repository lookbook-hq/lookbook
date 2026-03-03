import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

export default {
  extensions: [".svelte"],
  preprocess: vitePreprocess(),
};
