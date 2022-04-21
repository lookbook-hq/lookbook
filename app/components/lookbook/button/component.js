import tippy from "~/app/assets/lookbook/js/lib/tippy";

export default function buttonComponent() {
  return {
    init() {
      this._initTippy();
    },

    startSpin() {
      this._spinning = true;
    },

    stopSpin(delay = 0) {
      setTimeout(() => (this._spinning = false), delay);
    },

    _spinning: false,

    _initTippy() {
      if (this.$refs.tooltip) {
        this._labelTippy = tippy(this.$refs.icon, {
          triggerTarget: this.$el,
          content: this.$refs.tooltip.innerHTML,
        });
      }
    },

    _labelTippy: null,
  };
}
