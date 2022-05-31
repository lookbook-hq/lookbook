import tippy from "~/app/assets/lookbook/js/lib/tippy";
import buttonComponent from "@components/button/component";

export default function copyButtonComponent(target = null) {
  const button = buttonComponent();
  let notificationTippy = null;
  return {
    ...button,

    done: false,

    init() {
      button.init.bind(this)();
      if (target === null) {
        this._copyTarget = this.$refs.copyContent;
      } else {
        this._copyTarget =
          typeof target === "string" ? document.querySelector(target) : target;
      }
      notificationTippy = tippy(this.$el, {
        content: "Copied!",
        trigger: "manual",
      });
    },

    async copyToClipboard() {
      await window.navigator.clipboard.writeText(this.getContent());
      this.done = true;
      notificationTippy.show();
      if (this._tooltip) {
        this._tooltip.hide();
      }
      setTimeout(() => {
        this.done = false;
        notificationTippy.hide();
      }, 1000);
    },

    getContent() {
      const decoder = document.createElement("textarea");
      decoder.innerHTML = this._copyTarget ? this._copyTarget.innerHTML : "";
      return decoder.value.trim();
    },

    _copyTarget: null,
  };
}
