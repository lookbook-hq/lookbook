import Router from "@js/router";

export default function app() {
  return {
    router: null,
    sidebarPosition: Alpine.$persist(20).as("appSidebarPosition"),

    init() {
      this.router = new Router(this.$el);
      this.router.listenForUpdates(window.UPDATE_EVENTS_ENDPOINT);
    },

    destroy() {
      this.router.destroy();
    },
  };
}
