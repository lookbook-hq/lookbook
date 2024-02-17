import Logger from "./logger";
export default class Router {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.updateEventSources = [];
    this.onPopState = this.onPopState.bind(this);
    this.logger = new Logger();

    addEventListener("popstate", this.onPopState);
  }

  get location() {
    return document.location;
  }

  visit(url) {
    this.logger.info(`Navigating to ${url}`);

    history.pushState({}, "", url);
    dispatchEvent(new PopStateEvent("popstate", {}));
  }

  listenForUpdates(endpoint) {
    if (endpoint) {
      this.addUpdateEventSource(endpoint);
      this.logger.info(`Listening for updates from ${endpoint}`);
    }
  }

  async updatePage() {
    const { fragment } = await fetchHTML(
      this.location,
      `#${this.rootElement.id}`
    );
    morph(this.rootElement, fragment);
  }

  onPopState(event) {
    this.updatePage();
  }

  addUpdateEventSource(endpoint) {
    const source = new EventSource(endpoint);
    source.addEventListener("update", () => this.updatePage());
    this.updateEventSources.push(source);
  }

  destroy() {
    this.updateEventSources.forEach((source) => source.close());
    removeEventListener("popstate", this.onPopState);
  }
}

async function fetchHTML(url, selector) {
  const response = await fetch(url || window.document.location);
  const html = await response.text();
  const doc = new DOMParser().parseFromString(html, "text/html");
  return {
    ok: response.ok,
    fragment: selector ? doc.querySelector(selector).outerHTML : null,
    title: doc.title,
    response,
    doc,
  };
}

function morph(from, to) {
  Alpine.morph(from, to, {
    key(el) {
      return el.getAttribute("key") ? el.getAttribute("key") : el.id;
    },
    lookahead: true,
    updating(el, toEl, childrenOnly, skip) {
      if (el.tagName && el.tagName.includes("-")) {
        // preserve style attribute changes for custom elements
        if (el.hasAttribute("style")) {
          toEl.setAttribute("style", el.getAttribute("style"));
        }
      }
    },
  });
}
