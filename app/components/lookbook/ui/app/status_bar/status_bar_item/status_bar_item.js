import AlpineComponent from "@js/alpine/component";
import tippy from "tippy.js";

export default AlpineComponent("statusBarItem", () => {
  return {
    dropdown: null,
    tooltip: null,

    init() {
      this.$nextTick(() => {
        if (this.tooltipContent) {
          this.tooltip = tippy(this.$refs.content, {
            theme: "tooltip",
            content: () => this.tooltipContent,
          });
        }

        if (this.$refs.dropdown) {
          this.dropdown = tippy(this.$el, {
            allowHTML: true,
            interactive: true,
            theme: "dropdown",
            arrow: false,
            placement: "top-end",
            duration: 0,
            maxWidth: "none",
            offset: [4, 8],
            trigger: "click",
            hideOnClick: true,
            content: () => this.$refs.dropdown,
          });
        }
      });
    },

    hidePanel() {
      if (this.dropdown) this.dropdown.hide();
    },

    destroy() {
      if (this.tooltip) this.tooltip.destroy();
      if (this.dropdown) this.dropdown.destroy();
    },

    get tooltipContent() {
      return this.$el.hasAttribute("data-tooltip")
        ? this.$el.getAttribute("data-tooltip")
        : null;
    },
  };
});
