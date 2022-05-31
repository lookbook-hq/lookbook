import tippy from "~/app/assets/lookbook/js/lib/tippy";

export default function buttonComponent() {
  let labelTippy = null;
  let dropdownTippy = null;

  return {
    init() {
      if (this.$refs.tooltip) {
        labelTippy = tippy(this.$refs.icon, {
          delay: [200, 0],
          triggerTarget: this.$el,
          content: this.$refs.tooltip.innerHTML,
        });
      }
      if (this.$refs.dropdown) {
        dropdownTippy = tippy(this.$el, {
          content: this.$refs.dropdown.innerHTML,
          trigger: "click",
          theme: "menu",
          triggerTarget: this.$el,
          interactive: true,
          zIndex: 99999,
          onShow: () => this.$dispatch("dropdown:show", { dropdown: this }),
          onHide: () => this.$dispatch("dropdown:hide", { dropdown: this }),
        });
      }
    },

    hideDropdown() {
      dropdownTippy.hide();
    },

    startSpin() {
      this._spinning = true;
    },

    stopSpin(delay = 0) {
      setTimeout(() => (this._spinning = false), delay);
    },

    enableTooltip() {
      if (labelTippy) {
        labelTippy.enable();
      }
    },

    disableTooltip() {
      if (labelTippy) {
        labelTippy.disable();
      }
    },

    get _labelTippy() {
      return labelTippy;
    },

    _spinning: false,
  };
}
