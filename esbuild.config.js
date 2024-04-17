import esbuild from "esbuild";
import path from "path";
import hq from "alias-hq";
import importGlob from "./lib/scripts/esbuild-plugin-import-glob.js";

const watch = process.argv.includes("--watch");
const dev = watch || process.argv.includes("--dev");

function escapeStringRegexp(string) {
  return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}

const importMapper = hq.get(({ rootUrl, baseUrl, paths }) => {
  return (importPath) => {
    if (!importPath.includes("@")) {
      return importPath;
    }
    const basePath = path.join(rootUrl, baseUrl);
    for (const [aliasedPath, replacements] of Object.entries(paths)) {
      const regexp = new RegExp(
        "(^|.*/)" + escapeStringRegexp(aliasedPath).replace("\\*", "(.*)")
      );
      importPath = importPath.replace(
        regexp,
        path.join(basePath, replacements[0]).replace("*", "$2")
      );
    }
    return importPath;
  };
});

esbuild
  .context({
    entryPoints: [
      "assets/entrypoints/app.js",
      "assets/entrypoints/page.js",
      "assets/entrypoints/iframe.js",
      "assets/entrypoints/lookbook.js",
    ],
    bundle: true,
    metafile: true,
    outdir: "public/lookbook-assets",
    logLevel: dev ? "warning" : "error",
    plugins: [importGlob({ importMapper })],
  })
  .then((context) => {
    if (watch) {
      context.watch().catch(() => process.exit(1));
    } else {
      context.rebuild().then(() => context.dispose());
    }
  });
