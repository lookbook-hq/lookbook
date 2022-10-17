import tippy from "~/app/assets/lookbook/js/lib/tippy";
import { initTooltip } from "~/app/assets/lookbook/js/components/tooltip";

export default function buttonComponent() {
  let tooltip = null;
  let dropdown = null;

  return {
    init() {
      if (this.$refs.tooltip) {
        tooltip = initTooltip(this, {
          target: this.$refs.icon,
        });
      }

      if (this.$refs.dropdown) {
        dropdown = tippy(this.$el, {
          content: this.$refs.dropdown.innerHTML,
          trigger: "click",
          theme: "menu",
          triggerTarget: this.$el,
          interactive: true,
          zIndex: 99999,
          onShow: () => {
            if (!this.$store.settings.showTooltips) {
              return false;
            }
            this.$dispatch("dropdown:show", { dropdown: this });
          },
          onHide: () => this.$dispatch("dropdown:hide", { dropdown: this }),
        });
      }
    },

    hideDropdown() {
      if (dropdown) {
        dropdown.hide();
      }
    },

    updateDropdown() {
      if (dropdown) {
        dropdown.hide();
        this.$nextTick(() => {
          dropdown.setContent(this.$refs.dropdown.innerHTML);
        });
      }
    },

    startSpin() {
      this._spinning = true;
    },

    stopSpin(delay = 0) {
      setTimeout(() => (this._spinning = false), delay);
    },

    get _tooltip() {
      return tooltip;
    },

    _spinning: false,
  };
}
