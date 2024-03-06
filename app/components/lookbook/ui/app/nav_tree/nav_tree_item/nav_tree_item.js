import AlpineComponent from "@js/alpine/component";

export default AlpineComponent("navTreeItem", ({ keywords, collection }) => {
  return {
    keywords: [],
    isCollection: false,
    filteredOut: false,

    init() {
      this.keywords = keywords || [];
      this.isCollection = collection || false;

      this.toggleChildren = this.toggleChildren.bind(this);
      this.$el.expanded = this.expanded.includes(this.$el.getAttribute("key"));

      this.$nextTick(() => {
        this.$el.shadowRoot
          .querySelector("[part='expand-button']")
          .addEventListener("click", this.toggleChildren);
      });
    },

    toggleChildren(event) {
      event.stopPropagation();
      this.$root.expanded = !this.$root.expanded;
    },

    async itemClicked(event) {
      event.stopPropagation();

      const item = event.target.closest("sl-tree-item");
      const href = item.getAttribute("href");
      const hasChildren =
        item.getChildrenItems && item.getChildrenItems().length;

      if (href) {
        if (hasChildren) {
          item.expanded = !item.selected ? true : !item.expanded;
        }
        if (!item.selected) this.$dispatch("lookbook:visit", { url: href });
      } else {
        if (hasChildren) item.expanded = !item.expanded;
      }
    },

    async filter(text) {
      if (this.isCollection) {
        this.filteredOut = true;
        this.$root.getChildrenItems().forEach(async (child) => {
          const data = Alpine.$data(child);
          await data.filter(text);
          if (!data.filteredOut) {
            this.filteredOut = false;
          }
        });
      } else {
        this.filteredOut = !this.match(text);
      }
      return this;
    },

    match(text) {
      if (text.length) {
        const matched = this.keywords.map((k) => k.includes(text));
        return matched.filter((m) => m).length;
      }
      return true;
    },

    destroy() {
      this.$el.shadowRoot
        .querySelector("[part='expand-button']")
        .removeEventListener("click", this.toggleChildren);
    },
  };
});
