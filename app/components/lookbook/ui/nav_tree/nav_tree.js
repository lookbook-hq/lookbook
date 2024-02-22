export default function navTree(id) {
  return {
    expanded: Alpine.$persist([]).as(`nav-tree#${id}:expanded-items`),

    async init() {
      this.$nextTick(async () => {
        await this.$el.updateComplete;
        this.selectCurrentPageItem(true);

        this.$logger.debug("Nav tree initialized", this.$el);
      });
    },

    get selected() {
      return this.$el.querySelector("sl-tree-item[selected]");
    },

    selectCurrentPageItem(expandParents = false) {
      let currentItem = this.$el.querySelector(
        `sl-tree-item[href='${this.$router.pathname}']`
      );

      if (currentItem) {
        currentItem.selected = true;

        if (expandParents) {
          while (currentItem) {
            const parent = currentItem.parentElement;
            if (!currentItem.selected) {
              currentItem.expanded = true;
            }
            currentItem = parent.tagName === "SL-TREE-ITEM" ? parent : null;
          }
        }
      }
    },

    itemExpanded(event) {
      const key = event.target.getAttribute("key");
      if (this.expanded.indexOf(key) === -1) {
        this.expanded.push(key);
      }
    },

    itemCollapsed(event) {
      const key = event.target.getAttribute("key");
      const index = this.expanded.indexOf(key);
      if (index >= 0) this.expanded.splice(index, 1);
    },

    itemSelected(event) {
      const item = event.detail.selection[0];
      const href = item.getAttribute("href");
      if (href) this.$router.visit(href);
    },
  };
}
