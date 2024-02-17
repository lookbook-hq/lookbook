export default class Router {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.updateEventSources = [];
  }

  visit(path) {
    console.log(`Navigating to #{path}`);
    window.location = path;
  }

  listenForUpdates(endpoint) {
    if (endpoint) {
      this.addUpdateEventSource(endpoint);
      console.info(`Listening for updates from ${endpoint}`);
    }
  }

  async reload() {
    const { fragment } = await fetchHTML(
      window.location,
      `#${this.rootElement.id}`
    );
    morph(this.rootElement, fragment);
  }

  addUpdateEventSource(endpoint) {
    const source = new EventSource(endpoint);
    source.addEventListener("update", () => this.reload());
    this.updateEventSources.push(source);
  }

  destroy() {
    this.updateEventSources.forEach((source) => source.close());
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
      // custom element style attribute handling
      if (el.tagName && el.tagName.includes("-")) {
        if (el.hasAttribute("style")) {
          toEl.setAttribute("style", el.getAttribute("style"));
        }
      }
    },
  });
}
