import { getHighlighterCore } from "shiki/core";
import getWasm from "shiki/wasm";

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

const shikiDefaults = {
  theme: "github-light",
};

export default class Highlighter {
  constructor(lang, opts = {}) {
    this.lang = lang;
    this.theme = opts.theme || shikiDefaults.theme;
  }

  async highlight(code, opts = {}) {
    const theme = opts.theme || this.theme;
    const highlighter = await getHighlighterCore({
      themes,
      langs,
      loadWasm: getWasm,
    });

    return highlighter.codeToHtml(code, { lang: this.lang, theme });
  }
}
