import AlpineComponent from "@js/alpine/component";

export default AlpineComponent("navTreeItem", () => {
  return {
    init() {
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
        if (!item.selected) this.$router.visit(href);
      } else {
        if (hasChildren) item.expanded = !item.expanded;
      }
    },

    destroy() {
      this.$el.shadowRoot
        .querySelector("[part='expand-button']")
        .removeEventListener("click", this.toggleChildren);
    },
  };
});
