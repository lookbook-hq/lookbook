export default function pane() {
  return {
    init() {
      this.$logger.debug("Pane initialized", this.$el);
    },
  };
}
