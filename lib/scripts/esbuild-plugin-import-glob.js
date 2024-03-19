import fastGlob from "fast-glob";

export default function EsbuildPluginImportGlob({
  importMapper = (path) => path,
}) {
  return {
    name: "require-context",
    setup: (build) => {
      build.onResolve({ filter: /\*/ }, async ({ path, resolveDir }) => {
        if (resolveDir === "") {
          return; // Ignore unresolvable paths
        }

        return {
          path: `${resolveDir}|${path}`,
          namespace: "import-glob",
          pluginData: {
            path,
            resolveDir,
          },
        };
      });

      build.onLoad(
        { filter: /.*/, namespace: "import-glob" },
        async ({ pluginData: { resolveDir, path } }) => {
          const files = (
            await fastGlob(importMapper(path), {
              cwd: resolveDir,
            })
          ).sort();

          if (!files.length) {
            console.warn(
              `Warning: ${path} (in ${resolveDir}) did not match any files!`
            );
          }

          const importerCode = `
          ${files
            .map(
              (module, index) => `import * as module${index} from '${module}'`
            )
            .join(";")}

          const modules = [${files
            .map((_module, index) => `module${index}`)
            .join(",")}];

          export default modules;
          export const filenames = [${files
            .map((module) => `'${module}'`)
            .join(",")}]
        `;

          return { contents: importerCode, resolveDir };
        }
      );
    },
  };
}
