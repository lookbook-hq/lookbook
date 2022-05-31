import tippy from "~/app/assets/lookbook/js/lib/tippy";

export default function buttonComponent() {
  let labelTippy = null;
  return {
    init() {
      if (this.$refs.tooltip) {
        labelTippy = tippy(this.$refs.icon, {
          delay: [200, 0],
          triggerTarget: this.$el,
          content: this.$refs.tooltip.innerHTML,
        });
      }
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
