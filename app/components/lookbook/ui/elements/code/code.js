import AlpineComponent from "@js/alpine/component";
import Highlighter from "@js/highlighter";

export default AlpineComponent("code", ({ lang }) => {
  return {
    lang,
    output: "",
    wrap: false,

    init() {
      this.highlightCode();
    },

    async highlightCode() {
      this.output = await this.highlighter.highlight(this.source);
    },

    get highlighter() {
      return new Highlighter(this.lang);
    },

    get source() {
      return this.$refs.source.innerText;
    },
  };
});
