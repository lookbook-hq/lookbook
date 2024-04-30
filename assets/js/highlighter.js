import { getHighlighterCore } from "shiki/core";
import getWasm from "shiki/wasm";

const themes = [
  import("shiki/themes/github-light.mjs"),
  import("shiki/themes/github-dark.mjs"),
];

const langs = [
  import("shiki/langs/html.mjs"),
  import("shiki/langs/javascript.mjs"),
  import("shiki/langs/css.mjs"),
  import("shiki/langs/yaml.mjs"),
  import("shiki/langs/json.mjs"),
  import("shiki/langs/markdown.mjs"),
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

    try {
      return highlighter.codeToHtml(code, {
        lang: this.lang,
        themes: {
          light: "github-light",
          dark: "github-dark",
        },
      });
    } catch {
      return `<pre><code>${code}</code></pre>`;
    }
  }
}
