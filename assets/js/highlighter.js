import { createHighlighterCore } from "shiki/core";
import { createOnigurumaEngine } from "shiki/engine/oniguruma";

const themes = [
  import("@shikijs/themes/github-light"),
  import("@shikijs/themes/github-dark"),
];

const langs = [
  import("@shikijs/langs/html"),
  import("@shikijs/langs/javascript"),
  import("@shikijs/langs/css"),
  import("@shikijs/langs/yaml"),
  import("@shikijs/langs/json"),
  import("@shikijs/langs/markdown"),
  import("@shikijs/langs/ruby"),
  import("@shikijs/langs/erb"),
];

let highlighterInstance = null;

async function getHighlighter() {
  if (highlighterInstance === null) {
    highlighterInstance = await createHighlighterCore({
      themes,
      langs,
      engine: createOnigurumaEngine(import("shiki/wasm")),
    });
  }
  return highlighterInstance;
}

export default class Highlighter {
  constructor(lang) {
    this.lang = lang;
  }

  async highlight(code) {
    const highlighter = await getHighlighter();
    try {
      return highlighter.codeToHtml(code, {
        lang: this.lang,
        themes: {
          light: "github-light",
          dark: "github-dark",
        },
      });
    } catch (err) {
      console.error(err);
      return `<pre><code>${code}</code></pre>`;
    }
  }
}
