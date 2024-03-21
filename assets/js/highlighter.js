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

export default class Highlighter {
  async highlight(code, lang, options = {}) {
    const theme = options.theme || "github-light";
    const highlighter = await getHighlighterCore({
      themes,
      langs,
      loadWasm: getWasm,
    });
    return highlighter.codeToHtml(code, { lang, theme });
  }
}

const defaultHighligher = new Highlighter();
const highlight = defaultHighligher.highlight.bind(defaultHighligher);

export { highlight, Highlighter };
