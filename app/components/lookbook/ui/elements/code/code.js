import AlpineComponent from "@js/alpine/component";
import Highlighter from "@js/highlighter";

export default AlpineComponent("code", ({ lang }) => {
  return {
    lang,
    output: "",
    wrap: false,
    theme: "github-light",

    init() {
      this.highlightCode();
    },

    async highlightCode() {
      this.output = await this.highlighter.highlight(this.source, {
        theme: this.theme,
      });
    },

    get highlighter() {
      return new Highlighter(this.lang);
    },

    get source() {
      return this.$refs.source.innerText;
    },
  };
});
