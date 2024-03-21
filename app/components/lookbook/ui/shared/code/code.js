import AlpineComponent from "@js/alpine/component";
import { highlight } from "@js/highlighter";

export default AlpineComponent("code", ({ lang }) => {
  return {
    async init() {
      this.$refs.output.innerHTML = await highlight(
        this.$refs.source.innerText,
        lang
      );
    },
  };
});
