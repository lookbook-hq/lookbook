import AlpineComponent from "@js/alpine/component";
import { getData } from "@js/alpine/utils";

export default AlpineComponent("nav", (id) => {
  const store = Alpine.store("app").fetch("nav", id, {
    expandedItems: [],
    filterText: "",
  });

  return {
    id,
    empty: false,
    filteredOut: false,

    init() {
      this.$nextTick(() => {
        const currentElement = this.$el.querySelector(
          `[data-component='nav-item'][data-url='${document.location.pathname}']`
        );

        if (currentElement) {
          let currentItem = getData(currentElement);
          currentItem.selected = true;
          this.expandParentsOfItem(currentItem);
        }
      });
    },

    expandParentsOfItem(item) {
      let currentItem = item;
      while (currentItem) {
        const parent = currentItem.parent;
        if (!currentItem.selected) {
          currentItem.expanded = true;
        }
        currentItem = parent;
      }
    },

    collapseAll() {
      Array.from(
        this.$root.querySelectorAll("[data-component='nav-item']")
      ).forEach((node) => {
        getData(node).expanded = false;
      });
    },

    async filter() {
      const text = store.filterText;

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
      store.filterText = "";
    },

    get filterText() {
      return store.filterText;
    },

    set filterText(value) {
      store.filterText = value;
    },

    get expandedItems() {
      return store.expandedItems;
    },

    get children() {
      return Array.from(this.$refs.nav.children).map((node) => getData(node));
    },
  };
});
