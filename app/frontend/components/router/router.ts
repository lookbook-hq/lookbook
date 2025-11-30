import { LookbookElement } from "@lib/element.js";
import { customElement, html, property } from "@lib/lit.js";
import { Logger } from "@lib/logger.js";
import { morph } from "@lib/morph.js";
import { ServerEventsListener } from "@lib/sse.js";
import { isInternalAnchor } from "@lib/utils.js";

import { LookbookCommandEvent } from "@events";
import { debounce, isString } from "es-toolkit";
import styles from "./router.css?text";

/**
 * <lb-router>
 *
 * @summary Lookbook router.
 */
@customElement("lb-router")
export class LookbookRouter extends LookbookElement {
  static css = styles;

  @property({ attribute: "sse" }) sseEndpoint: string;
  @property() serverEventsListener: ServerEventsListener;
  @property() logger;

  constructor() {
    super();
    this.logger = new Logger("router");
    window.addEventListener("popstate", this.handlePopstate);
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.delegate("click", (event) => this.handleClick(event));
    this.on("lb-command", (event) => this.handleCommand(event));

    const debouncedQueryUpdate = debounce((name, value) => this.updateQueryParam(name, value), 150);
    this.on("lb-param-change", ({ detail }) => debouncedQueryUpdate(detail.name, detail.value));

    if (this.sseEndpoint) this.listenForServerEvents();
  }

  async visit(
    url: string | Location,
    selector: VisitOptions | string | null = null,
    options: VisitOptions | null = {}
  ) {
    url = url.toString();
    if (arguments.length == 2 && typeof selector === "object") {
      options = selector;
      selector = null;
    }

    const { history = false } = <VisitOptions>options;

    await this.updatePage(url, <string>selector);
    if (history) {
      window.history.pushState({}, "", url);
    }
  }

  reload() {
    this.visit(location);
  }

  async reset() {
    localStorage.clear();
    location.reload();
  }

  private listenForServerEvents() {
    if (!this.serverEventsListener) {
      this.serverEventsListener = new ServerEventsListener(this.sseEndpoint);
      this.serverEventsListener.on("update", () => this.updatePage());
      this.serverEventsListener.start();

      this.cleanupJobs.push(() => this.serverEventsListener.stop());
    }
  }

  private handleCommand(event: LookbookCommandEvent) {
    const { command, detail } = event;
    switch (command) {
      case "visit":
        return isString(detail.url)
          ? this.visit(detail.url, { history: true })
          : this.warn(`Missing or invalid 'url' value`);
      case "reload":
        return this.reload();
      case "reset":
        return this.reset(); // TODO: move reset functionality to lb-app component
      default:
        console.warn(`Unrecognised command '${command}'`);
        break;
    }
  }

  private handleClick(event) {
    const link = event.target.closest("[href]");

    if (link && isInternalAnchor(link)) {
      event.preventDefault();
      const target = link.getAttribute("data-target");
      this.visit(link.href, target ? `#${target}` : null, { history: true });
    }
  }

  private handlePopstate() {
    location.href = location; // TODO: morph here?
  }

  // TODO: move into own thing
  private updateQueryParam(name, value) {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(name, value);

    this.visit(`${location.pathname}?${searchParams.toString()}`, {
      history: true,
    });
  }

  async updatePage(url: string | Location = location, selector: string | null = null) {
    this.logger.debug(`Updating page`, {
      url,
      selector: selector || "lb-router",
    });

    try {
      let target;

      if (selector) {
        target = this.querySelector(selector);
      } else {
        selector = `#app`;
        target = document.getElementById("app");
      }

      const fetchResult = await this.fetchHTML(url.toString(), selector);
      if (fetchResult.ok) {
        this.logger.debug(`Updating DOM`);

        morph(target, fetchResult.fragment.outerHTML);

        if (fetchResult.title) {
          document.title = fetchResult.title;
        }
      } else {
        // TODO: surface errors in UI
        location.href = url.toString();
      }
    } catch (error) {
      // TODO: surface errors in UI
      this.logger.error(error);
    }
  }

  private async fetchHTML(url, selector = "lb-router", options = { headers: {} }) {
    const response = await fetch(url || location, {
      ...options,
      headers: { "X-Lookbook-Request": "true", ...options.headers },
    });

    const { status, ok } = response;
    let fragment,
      title = null;
    const result = { ok, status, response, fragment, title, url: response.url };

    if (status < 500) {
      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      result.title = doc.title;
      result.fragment = doc.querySelector(selector);
    }
    return result;
  }

  render() {
    return html`<slot></slot>`;
  }
}

interface VisitOptions {
  history?: boolean;
  strategy?: string;
}

declare global {
  interface HTMLElementTagNameMap {
    "lb-router": LookbookRouter;
  }
}
