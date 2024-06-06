import AlpineComponent from "@js/alpine/component";
import Cookies from "js-cookie";

export default AlpineComponent("app", () => {
  return {
    reflowing: false,

    resetUI() {
      Cookies.remove("lookbook-display-options");
      Cookies.remove("lookbook-color-scheme");
      Alpine.store("app").clear();
      window.location.reload();
      this.$logger.info(`Local storage cleared`);
    },

    bindings: {
      root: {
        ["@ui:resizing-start"]() {
          this.reflowing = true;
        },
        ["@ui:resizing-end"]() {
          this.reflowing = false;
        },
        ["@ui:reset"]() {
          this.resetUI();
        },
      },
    },
  };
});
