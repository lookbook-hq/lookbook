import createSocket from "./lib/socket";
import { morph } from "./helpers/dom";
import { fetchHTML } from "./helpers/request";
import { isExternalLink } from "./helpers/dom";

export default function app() {
  return {
    version: Alpine.$persist("").as("lookbook-version"),

    location: window.location,

    init() {
      if (window.SOCKET_PATH) {
        console.log("SOCKET CREATED");
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
