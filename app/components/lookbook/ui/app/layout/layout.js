import AlpineComponent from "@js/alpine/component";
import Cookies from "js-cookie";

export default AlpineComponent("layout", () => {
  return {
    appReflowing: false,

    resetLayout() {
      Cookies.remove("lookbook-display-options");
      Cookies.remove("lookbook-color-scheme");
      Alpine.store("app").clear();
      window.location.reload();
      this.$logger.info(`Local storage cleared`);
    },

    bindings: {
      root: {
        ["@layout:resizing-start"]() {
          this.appReflowing = true;
        },
        ["@layout:resizing-end"]() {
          this.appReflowing = false;
        },
        ["@layout:reset"]() {
          this.resetLayout();
        },
      },
    },
  };
});
