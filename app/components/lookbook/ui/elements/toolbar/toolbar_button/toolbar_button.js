import AlpineComponent from "@js/alpine/component";
import tippy from "@js/tippy";

export default AlpineComponent("toolbarButton", () => {
  return {
    dropdownOpen: false,
    dropdown: null,
    tooltip: null,

    init() {
      if (this.tooltipContent) {
        this.tooltip = tippy(this.$refs.content, {
          triggerTarget: this.$refs.inner,
          theme: "tooltip",
          content: () => this.tooltipContent,
          onShow: () => !this.dropdownOpen,
        });
      }

      this.$nextTick(() => {
        if (this.$refs.dropdown) {
          this.dropdown = tippy(this.$el, {
            allowHTML: true,
            interactive: true,
            theme: "dropdown",
            arrow: false,
            maxWidth: false,
            placement: "bottom-end",
            duration: 0,
            offset: [1, -1],
            trigger: "click",
            hideOnClick: true,
            content: () => this.$refs.dropdown.content.cloneNode(true),
            onShow: () => {
              this.dropdownOpen = true;
            },
            onHide: () => {
              this.dropdownOpen = false;
            },
          });
        }
      });
    },

    hidePopovers() {
      if (this.tooltip) this.tooltip.hide();
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