import { componentPlugin } from "@mdit-vue/plugin-component";
import markdownItWrapperlessFenceRule from "@olets/markdown-it-wrapperless-fence-rule";
import { defaultsDeep } from "es-toolkit/compat";
import MarkdownIt from "markdown-it";

const defaultOptions = {
  html: true,
  linkify: true,
};

export function markdownToHTML(str: string, options = {}) {
  const md = createMarkdownRenderer(options);
  return md.render(str);
}

export function createMarkdownRenderer(options) {
  const md = MarkdownIt(
    resolveOptions(options, {
      highlight: (str: string, lang: string) => `<lb-snippet lang="${lang}">${md.utils.escapeHtml(str)}</lb-snippet>`,
    })
  );

  md.use(componentPlugin);

  md.renderer.rules.fence = markdownItWrapperlessFenceRule;

  return md;
}

export function resolveOptions(...opts) {
  return defaultsDeep({}, ...opts, defaultOptions);
}
