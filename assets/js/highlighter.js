import { getHighlighterCore } from "shiki/core";
import getWasm from "shiki/wasm";
import * as prettier from "prettier/standalone";
import prettierHTML from "prettier/plugins/html";
import prettierEStree from "prettier/plugins/estree";
import prettierCSS from "prettier/plugins/postcss";
import prettierBabel from "prettier/plugins/babel";

const themes = [
  import("shiki/themes/github-light.mjs"),
  import("shiki/themes/min-light.mjs"),
  import("shiki/themes/slack-dark.mjs"),
  import("shiki/themes/nord.mjs"),
];

const langs = [
  import("shiki/langs/html.mjs"),
  import("shiki/langs/ruby.mjs"),
  import("shiki/langs/erb.mjs"),
];

const prettierPlugins = [
  prettierHTML,
  prettierEStree,
  prettierBabel,
  prettierCSS,
];

const prettierParsers = {
  html: "html",
  js: "babel",
  json: "json",
  css: "css",
};

const prettierDefaults = {
  singleAttributePerLine: false,
  bracketSameLine: true,
};

const shikiDefaults = {
  theme: "github-light",
};

export default class Highlighter {
  constructor(lang, { theme, prettify = true, ...opts }) {
    this.lang = lang;
    this.theme = theme || shikiDefaults.theme;
    this.shouldPrettify = prettify;
    this.prettierOptions = { ...prettierDefaults, ...opts };
  }

  prettify(code) {
    if (this.prettierParser) {
      return prettier.format(code, {
        parser: this.prettierParser,
        plugins: prettierPlugins,
        ...this.prettierOptions,
      });
    } else {
      return code;
    }
  }

  async highlight(code, opts = {}) {
    const theme = opts.theme || this.theme;
    const prettify =
      opts.prettify == null ? this.shouldPrettify : opts.prettify;

    const prettyCode = await (prettify ? this.prettify(code) : code);
    const highlighter = await getHighlighterCore({
      themes,
      langs,
      loadWasm: getWasm,
    });

    return highlighter.codeToHtml(prettyCode, { lang: this.lang, theme });
  }

  get prettierParser() {
    return prettierParsers[this.lang];
  }
}
