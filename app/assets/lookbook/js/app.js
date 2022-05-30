import packageJson from "~/package.json";
import createSocket from "./lib/socket";
import { morph } from "./helpers/dom";
import { fetchHTML } from "./helpers/request";

export default function app() {
  return {
    version: Alpine.$persist("").as("lookbook-version"),

    location: window.location,

    init() {
      // this.validateStorage();

      if (window.SOCKET_PATH) {
        const socket = createSocket(window.SOCKET_PATH);
        socket.addListener("Lookbook::ReloadChannel", () => this.updateDOM());
      }
    },

    navigateTo(path) {
      this.debug(`Navigating to ${path}`);
      history.pushState({}, null, path);
      this.$dispatch("popstate");
    },

    async handleNavigation() {
      this.debug("Navigating to ", window.location.pathname);
      this.$dispatch("navigation:start");
      this.location = window.location;
      await this.updateDOM();
      this.$dispatch("navigation:complete");
    },

    hijax(evt) {
      const link = evt.target.closest("a[href]");
      if (link && !isExternalLink(link)) {
        evt.preventDefault();
        this.navigateTo(link.href);
      }
    },

    async updateDOM() {
      this.debug("Starting DOM update");
      this.$dispatch("dom:update-start");
      try {
        const { fragment, title } = await fetchHTML(
          window.location,
          `#${this.$root.id}`
        );
        morph(this.$root, fragment);
        document.title = title;
        this.$dispatch("dom:update-complete");
        this.debug("DOM update complete");
      } catch (err) {
        this.error(err);
        window.location.reload();
      }
    },

    validateStorage() {
      if (
        this.version &&
        this.version.split(".")[0] !== packageJson.version.split(".")[0]
      ) {
        localStorage.clear();
        this.warn(`
          The data in localStorage is incomaptible with this version of Lookbook.
          Storage data has been cleared.
        `);
      }
      this.version = packageJson.version;
    },

    toggleSidebar() {
      this.$store.layout.sidebar.hidden = !this.$store.layout.sidebar.hidden;
    },

    closeMobileSidebar() {
      if (this.$store.layout.mobile && !this.sidebarHidden) {
        this.toggleSidebar();
      }
    },

    get sidebarHidden() {
      return this.$store.layout.sidebar.hidden;
    },

    ...Alpine.$log,
  };
}

function isExternalLink(link) {
  if (link.getAttribute("target") === "_blank") {
    return true;
  }
  if (link.href) {
    return link.host !== window.location.host;
  }
  return false;
}
