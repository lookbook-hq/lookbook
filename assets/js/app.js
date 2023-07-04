import createSocket from "./lib/socket";
import { morph } from "./helpers/dom";
import { fetchHTML } from "./helpers/request";
import { isExternalLink } from "./helpers/dom";

export default function app() {
  return {
    _requestsInProgress: 0,

    version: Alpine.$persist("").as("lookbook-version"),

    location: window.location,
    previousPathname: null,

    get sidebarHidden() {
      return this.$store.layout.sidebar.hidden;
    },

    get loading() {
      return this._requestsInProgress > 0;
    },

    init() {
      if (window.SOCKET_PATH) {
        this.debug(`Lookbook socket created`);
        const socket = createSocket(window.SOCKET_PATH);
        socket.addListener("Lookbook::ReloadChannel", () => this.updateDOM());
      }
    },

    navigateTo(path, isFragment = false) {
      this.debug(`Navigating to ${path}`);
      history.pushState({}, null, path);
      this.$dispatch("popstate", { isFragment });
    },

    async handleNavigation(evt) {
      // On a navigation event (popstate), see if the path has changed
      const pathSameOnEvent =
        this.previousPathname &&
        evt.target.location &&
        this.previousPathname === evt.target.location.pathname;
      // On a click event that was hijacked, see if the path changed
      const pathSameOnHijackedNavigate =
        this.previousPathname &&
        this.previousPathname === window.location.pathname;
      // On a click event that was hijacked, see if it was a 'fragment only' anchor that was clicked
      const eventIsFragmentClick = evt.detail && evt.detail.isFragment;
      const targetFragment = pathSameOnEvent
        ? evt.target.location.hash
        : window.location.hash;

      this.previousPathname = window.location.pathname;
      this.location = window.location;
      if (
        targetFragment &&
        (pathSameOnEvent || pathSameOnHijackedNavigate || eventIsFragmentClick)
      ) {
        this.scrollToFragment(targetFragment);
      } else {
        this.$dispatch("navigation:start");
        await this.updateDOM();
        // TODO: going back to the path without a fragment, from a url on same page but with a fragment, we need to seemingly wait before dispatching the event to allow the scroll to happen
        setTimeout(() => {
          this.$dispatch("navigation:complete");
        }, 10);
      }
    },

    scrollToFragment(fragment) {
      if (!fragment) {
        window.scrollTo(0, 0);
        return;
      }
      this.debug(`Scroll to ${fragment}`);
      const el = document.querySelector(fragment);
      if (el) {
        el.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    },

    // TODO: When page loads check if there is a fragment in the URL and scroll to it
    loaded() {
      // TODO: alpine:initialized happens before content is necessarily loaded...
      setTimeout(() => {
        this.scrollToFragment(window.location.hash);
      }, 100);
    },

    navigationCompleted() {
      this.scrollToFragment(window.location.hash);
    },

    hijax(evt) {
      const link = evt.target.closest("a[href]");
      if (link) {
        const external = isExternalLink(link);
        const embedded = this.isEmbedded();
        const isFragment = link.getAttribute("href").startsWith("#");

        if (embedded && (!link.hasAttribute("target") || external)) {
          evt.preventDefault();
          window.top.location = link.href;
          return;
        } else if (!embedded && !external && !link.hasAttribute("target")) {
          evt.preventDefault();
          this.navigateTo(link.href, isFragment);
          return;
        }
      }
    },

    async updateDOM() {
      this.debug("Starting DOM update");
      this.$dispatch("dom:update-start");
      this.requestStart();
      try {
        const { fragment, title } = await fetchHTML(
          window.location,
          `#${this.$root.id}`
        );
        morph(this.$root, fragment);
        document.title = title;
        this.requestEnd();
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

    requestStart() {
      this._requestsInProgress += 1;
    },

    requestEnd() {
      if (this._requestsInProgress > 0) {
        this._requestsInProgress -= 1;
      }
    },

    isEmbedded() {
      try {
        return window.self !== window.top;
      } catch (e) {
        return true;
      }
    },

    ...Alpine.$log,
  };
}
