import AlpineComponent from "@js/alpine/component";
import tippy from "tippy.js";

export default AlpineComponent("statusBarItem", () => {
  return {
    dropdownOpen: false,
    dropdown: null,

    init() {
      this.$nextTick(() => {
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
      if (this.dropdown) this.dropdown.destroy();
    },
  };
});
