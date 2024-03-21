import AlpineComponent from "@js/alpine/component";
import { getData } from "@js/alpine/utils";

export default AlpineComponent("codePanel", () => {
  return {
    wrapLines: false,

    get codeComponent() {
      return getData(this.$refs.code.firstElementChild);
    },
  };
});
