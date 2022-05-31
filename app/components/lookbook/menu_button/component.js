import tippy from "~/app/assets/lookbook/js/lib/tippy";
import buttonComponent from "@components/button/component";

export default function menuButtonComponent() {
  const button = buttonComponent();
  let menuTippy = null;
  return {
    ...button,

    async init() {
      menuTippy = tippy(this.$el, {
        content: this.$refs.menu.innerHTML,
        trigger: "click",
        theme: "menu",
        interactive: true,
        arrow: true,
        zIndex: 99999,
        // appendTo: "parent",
        onShow: () => this.$dispatch("menu:show", { menu: this }),
        onHide: () => this.$dispatch("menu:hide", { menu: this }),
      });
    },

    hideMenu() {
      menuTippy.hide();
    },
  };
}
