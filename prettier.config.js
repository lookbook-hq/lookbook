/** @type {import("prettier").Config} */

const config = {
  arrowParens: "always",
  bracketSpacing: true,
  htmlWhitespaceSensitivity: "css",
  insertPragma: false,
  bracketSameLine: false,
  trailingComma: "es5",
  printWidth: 120,
  proseWrap: "preserve",
  quoteProps: "as-needed",
  requirePragma: false,
  semi: true,
  singleQuote: false,
  jsxSingleQuote: false,
  tabWidth: 2,
  useTabs: false,
  organizeImportsSkipDestructiveCodeActions: true,
  singleAttributePerLine: true,
  plugins: ["prettier-plugin-organize-imports"],
};

export default config;
