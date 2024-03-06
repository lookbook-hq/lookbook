import ServerEventsListener from "./server_events_listener";
import Logger from "./logger";

export default class Router {
  constructor(sseEndpoint = null) {
    this.rootElement = document.querySelector("router");
    this.$logger = new Logger("Router");
    this.serverEventListener = null;

    // Hijack navigation clicks
    addEventListener("click", (event) => {
      const link = event.target.closest("[href]");
      if (link) {
        const isExternalLink = link.host && link.host !== window.location.host;

        if (!isExternalLink && !link.hasAttribute("target")) {
          event.preventDefault();
          this.visit(link.href);
        }
      }
    });

    // Handle `visit` events
    addEventListener("lookbook:visit", (event) => this.visit(event.detail.url));

    // Handle history navigation
    addEventListener("popstate", () => this.visit(window.location, false));

    // Listen out for update events from the server
    if (sseEndpoint) {
      this.serverEventListener = new ServerEventsListener(sseEndpoint);
      this.serverEventListener.on("update", () => this.updatePage());
      this.serverEventListener.start();

      addEventListener("visibilitychange", () => {
        if (!document.hidden) this.updatePage();
      });
    }
  }

  get location() {
    return document.location;
  }

  get pathname() {
    return document.location.pathname;
  }

  visit(url, updateHistory = true) {
    this.$logger.info(`Navigating to ${url}`);

    if (updateHistory) history.pushState({}, "", url);
    this.loadPage(url);
  }

  async updatePage() {
    const html = await this.fetchPageDOM(this.location);
    this.updateDOM(html);
    this.$logger.debug(`Page updated`);
    this.$dispatch("lookbook:page-update");
  }

  async loadPage(url = this.location) {
    const html = await this.fetchPageDOM(url);
    this.updateDOM(html);
    this.$logger.debug(`Page loaded`);
    this.$dispatch("lookbook:page-load");
  }

  async fetchPageDOM(url) {
    const { ok, fragment, status } = await fetchHTML(url, "router");
    if (ok) {
      return fragment;
    } else {
      // just redirect to the error page for now
      location.href = url;
    }
  }

  updateDOM(html) {
    morph(this.rootElement, html);
    this.$dispatch("lookbook:page-morph");
  }

  $dispatch(eventName, detail = {}) {
    document.dispatchEvent(
      new CustomEvent(eventName, { detail, bubbles: true })
    );
  }
}

async function fetchHTML(url, selector) {
  const response = await fetch(url || window.document.location);
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
  Alpine.morph(from, to, {
    key(el) {
      return el.getAttribute("key") ? el.getAttribute("key") : el.id;
    },

    lookahead: true,

    updating(el, toEl, childrenOnly, skip) {
      if (el.tagName && el.tagName.includes("-")) {
        // Fix custom element attribute removal when morphing

        const oldAttrs = Array.from(el.attributes).reduce((attrs, attr) => {
          attrs[attr.name] = attr.value;
          return attrs;
        }, {});

        const newAttrs = Array.from(toEl.attributes).map((attr) => attr.name);

        Object.entries(oldAttrs).forEach(([name, value]) => {
          if (!newAttrs.includes(name)) {
            toEl.setAttribute(name, value);
          }
        });
      }
    },
  });
}
