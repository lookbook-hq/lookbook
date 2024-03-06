import AlpineComponent from "@js/alpine/component";

export default AlpineComponent("page", () => {
  return {
    init() {
      this.$logger.debug("Page initialized", this.$el);
    },
  };
});
