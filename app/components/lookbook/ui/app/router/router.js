import AlpineComponent from "@js/alpine/component";
import ServerEventsListener from "@js/server_events_listener";
import { fetchHTML } from "@js/helpers";
import Logger from "@js/logger";

export default AlpineComponent("router", (sseEndpoint = null) => {
  return {
    serverEventsListener: null,
    routerLogger: null,
    lastUpdate: Date.now(),
    morphing: false,

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
      this.lastUpdate = Date.now();
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
      this.lastUpdate = Date.now();
      this.routerLogger.debug(`Page loaded`);
      this.$dispatch("page-load:complete");
    },

    async handleError(error) {
      if (this.morphing) {
        const { stack } = error.error;
        if (stack.indexOf("Alpine") >= 0) {
          window.location.reload();
        }
      }
    },

    async updateDOM(url, selector, options = {}) {
      if (this.morphing) {
        return;
      }

      const result = await fetchHTML(url, selector, options);
      if (result.status < 500) {
        this.morphing = true;
        document.dispatchEvent(new CustomEvent("morph:start"));
        Alpine.morph(document.querySelector(selector), result.fragment);
        this.$nextTick(() => {
          document.dispatchEvent(new CustomEvent("morph:complete"));
          this.morphing = false;
        });
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

    async handleVisibilityChange() {
      if (this.serverEventsListener && !document.hidden) {
        const response = await fetch(`${sseEndpoint}/ping`);
        const lastServerUpdate = Date.parse(await response.text());

        if (lastServerUpdate > this.lastUpdate) this.updatePage();
      }
    },

    destroy() {
      this.routerLogger.error(`Router instance destroyed!`);
    },
  };
});
