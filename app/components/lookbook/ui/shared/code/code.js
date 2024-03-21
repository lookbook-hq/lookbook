import AlpineComponent from "@js/alpine/component";
import Highlighter from "@js/highlighter";

export default AlpineComponent("code", ({ lang, prettify = true }) => {
  return {
    prettify: true,
    lang: null,
    output: "",
    wrap: false,

    init() {
      this.lang = lang;
      this.prettify = prettify;
      this.highlightCode();

      this.$watch("prettify", () => this.highlightCode());
    },

    async highlightCode() {
      this.output = await this.highlighter.highlight(this.source);
    },

    get highlighter() {
      return new Highlighter(this.lang, { prettify: this.prettify });
    },

    get source() {
      return this.$refs.source.innerText;
    },
  };
});
