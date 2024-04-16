import AlpineComponent from "@js/alpine/component";
import tippy from "tippy.js";

export default AlpineComponent("button", () => {
  return {
    init() {
      if (this.tooltip) {
        tippy(this.$el, {
          content: () => this.tooltip,
          appendTo: () => this.$refs.content,
        });
      }
    },

    get tooltip() {
      return this.$el.hasAttribute("data-tooltip")
        ? this.$el.getAttribute("data-tooltip")
        : null;
    },
  };
});
