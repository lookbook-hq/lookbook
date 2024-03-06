import AlpineComponent from "@js/alpine/component";

export default AlpineComponent("navTree", (id) => {
  return {
    expanded: Alpine.$persist([]).as(`nav-tree#${id}:expanded-items`),
    updating: false,

    async init() {
      this.$nextTick(async () => {
        await this.$el.updateComplete;
        this.selectCurrentPageItem(true);
      });
    },

    selectCurrentPageItem(expandParents = false) {
      if (this.selected) {
        this.selected.selected = false;
      }

      let currentItem = this.$el.querySelector(
        `sl-tree-item[href='${document.location.pathname}']`
      );

      if (currentItem) {
        const hasChildren =
          currentItem.getChildrenItems && currentItem.getChildrenItems().length;
        currentItem.selected = true;

        if (expandParents) {
          if (hasChildren) currentItem.expanded = true;

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

    collapseAll() {
      Array.from(this.items).forEach((item) => (item.expanded = false));
    },

    get items() {
      return this.$root.querySelectorAll("sl-tree-item");
    },

    get selected() {
      return this.$root.querySelector("sl-tree-item[selected]");
    },
  };
});
