import morph from "./utils/morph";

export default function page() {
  const store = Alpine.store("page");
  return {
    ready: false,
    init() {
      this.$nextTick(() => (this.ready = true));
    },
    splitProps: {
      minSize: 200,
      onDrag(splits) {
        Alpine.store("nav").width = Math.min(splits[0], 500);
      },
    },
    async fetchHTML() {
      const response = await fetch(window.document.location);
      if (!response.ok) return window.location.reload();
      const html = await response.text();
      store.doc = new DOMParser().parseFromString(html, "text/html");
      return store.doc;
    },
    updateTitle() {
      document.title = store.doc.title;
    },
    render() {
      if (this.ready) {
        morph(this.$el, store.doc.getElementById(this.$el.id));
      }
    },
  };
}
