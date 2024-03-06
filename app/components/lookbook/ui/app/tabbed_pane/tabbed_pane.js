import AlpineComponent from "@js/alpine/component";

export default AlpineComponent("tabbedPane", () => {
  return {
    init() {
      this.$logger.debug("Tabbed pane initialized", this.$el);
    },
  };
});
