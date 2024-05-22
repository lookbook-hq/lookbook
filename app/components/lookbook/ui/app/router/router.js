import AlpineComponent from "@js/alpine/component";
import ServerEventsListener from "@js/server_events_listener";
import { fetchHTML } from "@js/helpers";
import Logger from "@js/logger";

export default AlpineComponent("router", (sseEndpoint = null) => {
  return {
    serverEventsListener: null,
    routerLogger: null,

    init() {
      this.routerLogger = new Logger("Router");

      if (sseEndpoint) {
        this.serverEventsListener = new ServerEventsListener(sseEndpoint);
        this.serverEventsListener.on("update", () => this.updatePage());
        this.serverEventsListener.start();
      }
    },

    visit(url, updateHistory = true) {
      this.routerLogger.info(`Navigating to ${url}`);

      this.loadPage(url, updateHistory);
    },

    async updatePage() {
      this.$dispatch("page-update:start");
      await this.updateDOM(location, "router", {
        headers: { "X-Lookbook-Frame": "root" },
      });
      this.routerLogger.info(`Page updated`);
      this.$dispatch("page-update:complete");
    },

    async loadPage(url, updateHistory = true) {
      this.$dispatch("page-load:start");
      const result = await this.updateDOM(url, "main", {
        headers: { "X-Lookbook-Frame": "main" },
      });
      if (updateHistory) {
        history.pushState({}, "", result.url);
      }
      this.routerLogger.debug(`Page loaded`);
      this.$dispatch("page-load:complete");
    },

    async updateDOM(url, selector, options = {}) {
      const result = await fetchHTML(url, selector, options);
      if (result.status < 500) {
        document.dispatchEvent(new CustomEvent("morph:start"));
        Alpine.morph(document.querySelector(selector), result.fragment);
        document.dispatchEvent(new CustomEvent("morph:complete"));
      } else {
        location.href = url;
      }
      return result;
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
