import AlpineComponent from "@js/alpine/component";

export default AlpineComponent("app", () => {
  return {
    sidebarPosition: Alpine.$persist(20).as("app:sidebar-position"),

    init() {
      this.$logger.debug("App initialized", this.$el);
    },

    hijackNavigation(event) {
      const link = event.target.closest("a[href]");
      if (link) {
        event.preventDefault();
        this.$router.visit(link.href);
      }
    },
  };
});
