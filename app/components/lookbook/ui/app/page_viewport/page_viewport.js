import AlpineComponent from "@js/alpine/component";

export default AlpineComponent("pageViewport", () => {
  return {
    init() {
      this.$logger.debug("Page viewport initialized", this.$el);
    },
  };
});
