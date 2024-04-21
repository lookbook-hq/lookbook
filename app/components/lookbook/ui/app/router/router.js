import AlpineComponent from "@js/alpine/component";
import ServerEventsListener from "@js/server_events_listener";
import PageUpdater from "@js/page_updater";
import Logger from "@js/logger";

export default AlpineComponent("router", (sseEndpoint = null) => {
  return {
    serverEventsListener: null,
    routerLogger: null,

    init() {
      this.routerLogger = new Logger("Router");
      this.updater = new PageUpdater(this.$el, "router");

      if (sseEndpoint) {
        this.serverEventsListener = new ServerEventsListener(sseEndpoint);
        this.serverEventsListener.on("update", () => this.updatePage());
        this.serverEventsListener.start();
      }
    },

    visit(url, updateHistory = true) {
      this.routerLogger.info(`Navigating to ${url}`);

      if (updateHistory) history.pushState({}, "", url);
      this.loadPage(url);
    },

    async updatePage() {
      this.$dispatch("page-update:start");
      await this.updater.updateDOM(location);
      this.routerLogger.info(`Page updated`);
      this.$dispatch("page-update:complete");
    },

    async loadPage(url = location) {
      this.$dispatch("page-load:start");
      await this.updater.updateDOM(url);
      this.routerLogger.debug(`Page loaded`);
      this.$dispatch("page-load:complete");
    },

    handleClick(event) {
      const link = event.target.closest("[href]");
      if (link) {
        const isExternalLink = link.host && link.host !== location.host;

        if (!isExternalLink && !link.hasAttribute("target")) {
          event.preventDefault();
          this.visit(link.href);
        }
      }
    },

    handleVisibilityChange() {
      if (this.serverEventsListener && !document.hidden) this.updatePage();
    },

    destroy() {
      this.routerLogger.error(`Router instance destroyed!`);
    },
  };
});
