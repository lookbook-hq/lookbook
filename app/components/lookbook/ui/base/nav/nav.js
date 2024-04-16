import AlpineComponent from "@js/alpine/component";
import { getData } from "@js/alpine/utils";

export default AlpineComponent("nav", (id) => {
  return {
    expandedItems: Alpine.$persist([]).as(`nav#${id}:expanded-items`),
    filterText: Alpine.$persist("").as(`nav#${id}:filter-text`),
    empty: false,
    filteredOut: false,

    init() {
      this.$nextTick(() => this.updateSelection(true));
    },

    updateSelection(expandParents = false) {
      if (this.selectedItem) {
        this.selectedItem.selected = false;
      }

      const currentElement = this.$el.querySelector(
        `[data-component='nav-item'][data-url='${document.location.pathname}']`
      );

      if (currentElement) {
        let currentItem = getData(currentElement);
        currentItem.selected = true;

        if (expandParents) {
          while (currentItem) {
            const parent = currentItem.parent;
            if (!currentItem.selected) {
              currentItem.expanded = true;
            }
            currentItem = parent;
          }
        }
      }
    },

    async filter() {
      const text = this.filterText;

      await this.$nextTick();
      const filteredStates = await Promise.all(
        this.children.map(async (data) => {
          await data.filter(text);
          return data.filteredOut;
        })
      );

      const matchedChildCount = filteredStates.filter((s) => !s).length;
      this.empty = matchedChildCount === 0;
    },

    clearFilter() {
      this.filterText = "";
    },

    get children() {
      return Array.from(this.$refs.nav.children).map((node) => getData(node));
    },

    get selectedItem() {
      return getData(
        this.$el.querySelector(
          `[data-component='nav-item'][aria-selected='true']`
        )
      );
    },
  };
});
