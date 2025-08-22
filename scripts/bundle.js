import esbuild from "esbuild";
import { copy } from "esbuild-plugin-copy";
import { clean } from "esbuild-plugin-clean";
import postcssPlugin from "@chialab/esbuild-plugin-postcss";
import manifestPlugin from "esbuild-plugin-manifest";

const watch = process.argv.includes("--watch");

const context = await esbuild.context({
  entryPoints: ["assets/scripts.js", "assets/styles.css"],
  bundle: true,
  metafile: true,
  outdir: "public/lookbook-assets",
  logLevel: "warning",
  // format: "esm",
  target: ["es2018"],
  plugins: [
    clean({
      patterns: ["./public/lookbook-assets/*"],
    }),
    copy({
      resolveFrom: "cwd",
      assets: [
        {
          from: [
            "./node_modules/@fontsource-variable/inter/files/inter-latin-*",
          ],
          to: ["./public/lookbook-assets/fonts"],
        },
        {
          from: [
            "./node_modules/@fontsource-variable/source-code-pro/files/source-code-pro-latin-*",
          ],
          to: ["./public/lookbook-assets/fonts"],
        },
      ],
    }),
    postcssPlugin(),
    manifestPlugin(),
  ],
});

try {
  if (watch) {
    await context.watch();
  } else {
    await context.rebuild();
    console.log("Assets bundled");
    await context.dispose();
  }
} catch (err) {
  console.error(err);
  process.exit(1);
}
