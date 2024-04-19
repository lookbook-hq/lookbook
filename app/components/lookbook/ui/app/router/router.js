import AlpineComponent from "@js/alpine/component";
import ServerEventsListener from "@js/server_events_listener";
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

      if (updateHistory) history.pushState({}, "", url);
      this.loadPage(url);
    },

    async updatePage() {
      const html = await fetchPageDOM(location);
      this.updateDOM(html);
      this.routerLogger.info(`Page updated`);
      this.$dispatch("lookbook:page-update");
    },

    async loadPage(url = location) {
      const html = await fetchPageDOM(url);
      this.updateDOM(html);
      this.routerLogger.debug(`Page loaded`);
      this.$dispatch("lookbook:page-load");
    },

    updateDOM(html) {
      morph(this.$root, html);
      this.$dispatch("lookbook:page-morph");
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

async function fetchPageDOM(url) {
  const { ok, fragment, status } = await fetchHTML(url, "router");
  if (ok) {
    return fragment;
  } else {
    // just redirect to the error page for now
    location.href = url;
  }
}

async function fetchHTML(url, selector) {
  const response = await fetch(url || location);
  const { status, ok } = response;
  let fragment,
    title = null;
  const result = { ok, status, response, fragment, title };
  if (response.ok) {
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    result.fragment = selector ? doc.querySelector(selector).outerHTML : null;
  }
  return result;
}

function morph(from, to) {
  Alpine.morph(from, to, {});
}
