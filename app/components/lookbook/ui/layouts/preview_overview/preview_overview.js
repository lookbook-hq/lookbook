import AlpineComponent from "@js/alpine/component";

export default AlpineComponent("previewOverview", () => {
  return {
    init() {
      this.$logger.debug("Preview overview initialized", this.$el);
    },
  };
});
