import AlpineComponent from "@js/alpine/component";
import { getData } from "@js/alpine/utils";

export default AlpineComponent("pane", (id) => {
  const store = Alpine.store("app").fetch("pane", id, {
    activePanel: null,
  });

  return {
    init() {
      this.$nextTick(() => {
        if (store.activePanel === null && this.toolbar.tabs.length) {
          store.activePanel = this.toolbar.tabs[0].name;
        }
        this.toolbar.activeTab = store.activePanel;
      });
    },

    isActivePanel(name) {
      return store.activePanel === name;
    },

    get toolbar() {
      return getData(this.$root.querySelector("[data-component='toolbar']"));
    },

    bindings: {
      root: {
        ["@toolbar:tab-selected"](event) {
          store.activePanel = event.detail.name;
        },
      },
    },
  };
});
