import { bundledLanguages, bundledThemes, createHighlighter } from "@lib/shiki.js";

import stripIndent from "strip-indent";

export const highlighter = await createHighlighter({
  themes: Object.keys(bundledThemes),
  langs: Object.keys(bundledLanguages),
});

export function highlight(str: string, options = {}) {
  const defaultOptions = {
    theme: "github-light",
    lang: "ruby",
  };

  return highlighter.codeToHtml(str, { ...defaultOptions, ...options });
}

// TODO: Expand set of guessed languages
export function guessLanguage(codeString: string, fallback = "text"): string {
  codeString = stripIndent(codeString).trim();
  if (codeString.indexOf("<%") >= 0) {
    return "erb";
  } else if (/$\s+\%/.test(codeString)) {
    return "haml";
  } else {
    return fallback;
  }
}
