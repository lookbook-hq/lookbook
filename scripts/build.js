import chalk from "chalk";
import chokidar from "chokidar";
import { deleteAsync } from "del";
import esbuild from "esbuild";
import { mkdir, readFile, writeFile } from "fs/promises";
import { globby } from "globby";
import { dirname, join, relative } from "node:path";
import process from "node:process";
import ora from "ora";
import copy from "recursive-copy";
import { codegen } from "shiki-codegen";
import { fileURLToPath } from "url";
import { buildConfig, highlighterConfig } from "../config/frontend.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const isDeveloping = process.argv.includes("--develop");

const spinner = ora({ text: "Lookbook", color: "cyan", stream: process.stdout }).start();

const getRootDir = () => process.env.ROOT_DIR || dirname(__dirname);
const getFullPath = (...args) => join(getRootDir(), ...args.filter((a) => a));
const getDistDir = () => getFullPath(buildConfig.distDir, isDeveloping ? `lookbook-assets-dev` : `lookbook-assets`);
const getSrcDir = () => getFullPath(buildConfig.srcDir);
const getSrcPath = (path = null) => getFullPath(buildConfig.srcDir, path);

import { transform } from "esbuild";

export const ImportStylesheetAsText = {
  name: "ImportStylesheetAsTextPlugin",
  setup(build) {
    build.onLoad({ filter: /\.css$/ }, async (args) => {
      if (args.suffix === "?text") {
        const f = await readFile(args.path);
        const css = await transform(f, { loader: "css" });
        return { loader: "text", contents: css.code };
      }
    });
  },
};

let buildContext;

export async function build() {
  /**
   * Runs the full build.
   */
  async function buildAll() {
    const start = Date.now();

    try {
      await cleanup();
      await copyImages();
      await generateShikiBundle();
      await generateBundle();

      const time = (Date.now() - start) / 1000 + "s";
      spinner.succeed(`The build is complete ${chalk.gray(`(finished in ${time})`)}`);
    } catch (err) {
      spinner.fail();
      console.log(chalk.red(`\n${err}`));
    }
  }

  async function cleanup() {
    spinner.start("Cleaning up old files");

    await deleteAsync(getDistDir());
    await mkdir(getDistDir(), { recursive: true });

    spinner.succeed();
  }

  async function generateBundle() {
    spinner.start("Generating bundle...");

    const config = {
      format: "esm",
      target: buildConfig.target,
      entryPoints: [await globby(getSrcPath("**/*.ts")), getSrcPath("*.css")].flat(),
      outdir: getDistDir(),
      bundle: true,
      metafile: !!buildConfig.metafile,
      splitting: false,
      chunkNames: "chunks/[name].[hash]",
      minify: !isDeveloping,
      plugins: [ImportStylesheetAsText],
      loader: {
        ".woff2": "file",
      },
    };

    try {
      if (isDeveloping) {
        buildContext = await esbuild.context(config);

        await buildContext.rebuild();
      } else {
        let buildData = await esbuild.build(config);
        await writeFile(buildConfig.metafile, JSON.stringify(buildData.metafile));
      }
    } catch (error) {
      spinner.fail();
      console.log(chalk.red(`\n${error}`));
      if (!isDeveloping) {
        process.exit(1);
      }
    }

    spinner.succeed();
  }

  async function regenerateBundle() {
    try {
      spinner.start("Regenerating bundle...");
      await buildContext.rebuild();
    } catch (error) {
      spinner.fail();
      console.log(chalk.red(`\n${error}`));

      if (!isDeveloping) {
        process.exit(1);
      }
    }

    spinner.succeed();
  }

  await buildAll();

  if (isDeveloping) {
    spinner.start("Watching files...");

    const watchEvents = ["change", "unlink", "add"];
    const watcher = chokidar.watch(getSrcDir(), {
      persistent: true,
      ignoreInitial: true,
    });

    watchEvents.forEach((evt) => {
      watcher.on(evt, handleWatchEvent(evt));
    });

    function handleWatchEvent(evt) {
      return async (filename) => {
        const changedFile = relative(getRootDir(), filename);

        if (evt === "change") {
          spinner.info(`File modified ${chalk.gray(`(${changedFile})`)}`);
        } else if (evt === "unlink") {
          spinner.info(`File deleted ${chalk.gray(`(${changedFile})`)}`);
        } else if (evt === "add") {
          spinner.info(`File added ${chalk.gray(`(${changedFile})`)}`);
        }

        try {
          await regenerateBundle();
          spinner.start("Watching for changes");
        } catch (err) {
          console.error(chalk.red(err));

          if (!isDeveloping) {
            process.exit(1);
          }
        }
      };
    }
  }

  function terminate() {
    buildContext?.dispose?.();

    if (spinner) spinner.stop();
    process.exit();
  }

  process.on("exit", () => terminate());
  process.on("SIGHUP", () => terminate());
  process.on("SIGINT", () => terminate());
  process.on("SIGTERM", () => terminate());
}

export async function generateShikiBundle() {
  spinner.start("Generating custom Shiki bundle");

  const { code } = await codegen({
    langs: highlighterConfig.languages.options,
    themes: highlighterConfig.themes.options,
    engine: "javascript",
    typescript: true,
  });

  await writeFile(getSrcPath(`lib/shiki.ts`), code, "utf8");

  spinner.succeed();
}

function isRunAsMain() {
  if (import.meta.url.startsWith("file:")) {
    const modulePath = fileURLToPath(import.meta.url);
    if (process.argv[1] === modulePath) {
      return true;
    }
  }

  return false;
}

if (isRunAsMain()) {
  await build();
}

export async function copyImages() {
  spinner.start("Copy image assets");

  await copy(getSrcPath("images"), getDistDir(), {
    overwrite: true,
  });

  spinner.succeed();
}

// export async function copyIcons() {
//   spinner.start("Copy icons");

//   await copy(getIconsSrc(), getDistDir("icons"), {
//     filter: ["*/*.svg"],
//     overwrite: true,
//     rename: (filePath) => {
//       return filePath.replace("icons-solid", "filled").replace("icons", "line");
//     },
//   });

//   spinner.succeed();
// }

// async function generateIcons() {
//   const dirToCopy = join(rootDir, "node_modules/@tabler/icons/icons");
//   const licenseToCopy = join(rootDir, "node_modules/@tabler/icons/LICENSE");
//   const iconsJson = join(rootDir, "node_modules/@tabler/icons/icons.json");

//   spinner.start("Packaging icons");

//   await rm(iconDir, { recursive: true, force: true });
//   await mkdir(iconDir, { recursive: true });
//   await copy(dirToCopy, iconDir);
//   await copy(licenseToCopy, join(iconDir, "LICENSE"));
//   await copy(iconsJson, join(distDir, "icons.json"));

//   spinner.succeed();

//   return Promise.resolve();
// }
