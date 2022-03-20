import createSocket from "../lib/socket";

const morphOpts = {
  key(el) {
    return el.getAttribute("key") ? el.getAttribute("key") : el.id;
  },
  lookahead: false,
  updating(el, toEl, childrenOnly, skip) {
    if (
      el.getAttribute &&
      el.getAttribute("data-morph-strategy") === "replace"
    ) {
      el.innerHTML = toEl.innerHTML;
      return skip();
    }
  },
};

export default function app() {
  return {
    init() {
      if (window.SOCKET_PATH) {
        const socket = createSocket(window.SOCKET_PATH);
        socket.addListener("Lookbook::ReloadChannel", () => this.refresh());
      }
    },
    async update() {
      const response = await fetch(window.document.location);
      if (!response.ok) return window.location.reload();
      const html = await response.text();
      const newDoc = new DOMParser().parseFromString(html, "text/html");
      this.morph(newDoc);
      document.title = newDoc.title;
    },
    setLocation(loc) {
      let path;
      if (loc instanceof Event) {
        path = loc.currentTarget.href;
        loc.preventDefault();
      } else {
        path = loc;
      }
      history.pushState({}, null, path);
      this.$dispatch("popstate");
    },
    refresh() {
      this.$dispatch("refresh");
    },
    morph(dom) {
      const pageHtml = dom.getElementById(this.$root.id).outerHTML;
      Alpine.morph(this.$root, pageHtml, morphOpts);
      this.$dispatch("page:morphed");
    },
  };
}
