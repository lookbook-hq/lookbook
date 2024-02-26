import Logger from "./logger";

export default class Router {
  constructor(rootElementId) {
    this.rootElement = document.getElementById(rootElementId);
    this.loadPage = this.loadPage.bind(this);
    this.updatePage = this.updatePage.bind(this);
    this.$logger = new Logger("Router");

    addEventListener("popstate", this.loadPage);
  }

  get location() {
    return document.location;
  }

  get pathname() {
    return document.location.pathname;
  }

  visit(url) {
    this.$logger.info(`Navigating to ${url}`);
    this.$dispatch("lookbook:visit", { url });

    history.pushState({}, "", url);
    this.loadPage(url);
  }

  async updatePage() {
    const html = await this.fetchPageDOM(this.location);
    this.updateDOM(html);
    this.$logger.debug(`Page updated`);
    this.$dispatch("lookbook:page-update");
  }

  async loadPage(url = null) {
    const html = await this.fetchPageDOM(url || this.location);
    this.updateDOM(html);
    this.$logger.debug(`Page loaded`);
    this.$dispatch("lookbook:page-load");
  }

  async fetchPageDOM(url) {
    const { ok, fragment, status } = await fetchHTML(
      url,
      `#${this.rootElement.id}`
    );
    if (ok) {
      return fragment;
    } else {
      location.href = url;
      // throw new Error(`Failed to fetch from '${url}' - error ${status}`);
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
