import AlpineComponent from "@js/alpine/component";

export default AlpineComponent("pane", () => {
  return {
    init() {
      this.$logger.debug("Pane initialized", this.$el);
    },
  };
});
