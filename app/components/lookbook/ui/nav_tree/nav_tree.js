export default function navTree(id) {
  return {
    async init() {
      this.$nextTick(async () => {
        await this.$el.updateComplete;
        let currentItem = this.$el.querySelector(
          `sl-tree-item[href='${this.$router.pathname}']`
        );
        currentItem.selected = true;

        while (currentItem) {
          const parent = currentItem.parentElement;
          currentItem.expanded = true;
          currentItem = parent.tagName === "SL-TREE-ITEM" ? parent : null;
        }

        this.$logger.debug("Nav tree initialized", this.$el);
      });
    },

    get selected() {
      return this.$el.querySelector("sl-tree-item[selected]");
    },

    itemSelected(event) {
      const item = event.detail.selection[0];
      const href = item.getAttribute("href");
      if (href) this.$router.visit(href);
    },
  };
}
