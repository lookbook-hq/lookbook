/** @type {import("prettier").Config} */

const config = {
  arrowParens: "always",
  bracketSpacing: true,
  htmlWhitespaceSensitivity: "css",
  insertPragma: false,
  bracketSameLine: false,
  trailingComma: "es5",
  printWidth: 100,
  proseWrap: "preserve",
  quoteProps: "as-needed",
  requirePragma: false,
  semi: true,
  singleQuote: false,
  jsxSingleQuote: false,
  tabWidth: 2,
  useTabs: false,
  organizeImportsSkipDestructiveCodeActions: true,
  singleAttributePerLine: false,
  // plugins: ["prettier-plugin-organize-imports", "prettier-plugin-svelte"],
  overrides: [{ files: "*.svelte", options: { parser: "svelte" } }],
};

export default config;
