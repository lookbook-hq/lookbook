import Router from "@js/router";

export default function app() {
  return {
    router: null,
    sidebarPosition: Alpine.$persist(20).as("app:sidebar-position"),

    init() {
      this.router = new Router(this.$el, this.$log);
      this.router.listenForUpdates(window.UPDATE_EVENTS_ENDPOINT);
      this.$logger.debug("App component initialized");
    },

    hijackNavigation(event) {
      const link = event.target.closest("a[href]");
      if (link) {
        event.preventDefault();
        this.router.visit(link.href);
      }
    },

    destroy() {
      this.router.cleanup();
    },
  };
}
