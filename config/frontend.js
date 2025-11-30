export const buildConfig = {
  srcDir: "app/frontend",
  distDir: "dist",
  target: "es2022",
  metafile: "./tmp/esbuild-meta.json",
};

export const highlighterConfig = {
  languages: {
    default: "erb",
    options: ["ruby", "erb", "haml", "html", "markdown", "json", "yaml", "css", "sass"],
  },
  themes: {
    default: "github-light",
    options: ["github-light", "github-dark"],
  },
};

export const uiDefaults = {
  app: {
    splitPosition: 300,
  },
  inspector: {
    sidebarSplit: 280,
    drawerSplit: 400,
  },
};

export default { buildConfig, highlighterConfig, uiDefaults };
