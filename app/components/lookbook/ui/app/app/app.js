import AlpineComponent from "@js/alpine/component";

export default AlpineComponent("app", () => {
  return {
    appReflowing: false,

    bindings: {
      root: {
        ["@layout:resizing-start"]() {
          this.appReflowing = true;
        },
        ["@layout:resizing-end"]() {
          this.appReflowing = false;
        },
      },
    },
  };
});
