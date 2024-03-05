import AlpineComponent from "@js/alpine/component";
import Prism from "@js/prism";

export default AlpineComponent("code", () => {
  return {
    init() {
      Prism.highlightElement(this.$refs.code);
    },
  };
});
