import createSocket from "../lib/socket";

export default function page() {
  return {
    init() {
      const socket = createSocket(window.SOCKET_PATH);
      socket.addListener("Lookbook::ReloadChannel", () => this.refresh());
    },
    async update() {
      const response = await fetch(window.document.location);
      if (!response.ok) return window.location.reload();
      const html = await response.text();
      this.morph(new DOMParser().parseFromString(html, "text/html"));
    },
    setLocation(loc) {
      const path = loc instanceof Event ? loc.currentTarget.href : loc;
      history.pushState({}, null, path);
      this.$dispatch("popstate");
    },
    refresh() {
      this.$dispatch("popstate");
    },
    morph(dom) {
      const pageHtml = dom.getElementById(this.$root.id).outerHTML;
      Alpine.morph(this.$root, pageHtml, {
        key(el) {
          return el.getAttribute("key") ? el.getAttribute("key") : el.id;
        },
      });
      this.$dispatch("page:morphed");
    },
  };
}
