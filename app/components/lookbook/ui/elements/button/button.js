import AlpineComponent from "@js/alpine/component";
import tippy from "@js/tippy";

export default AlpineComponent("button", () => {
  return {
    tooltip: null,

    init() {
      if (this.tooltipContent) {
        this.tooltip = tippy(this.$el, {
          theme: "tooltip",
          content: () => this.tooltipContent,
        });
      }
    },

    destroy() {
      if (this.tooltip) this.tooltip.destroy();
    },

    get tooltipContent() {
      return this.$el.hasAttribute("data-tooltip")
        ? this.$el.getAttribute("data-tooltip")
        : null;
    },
  };
});
