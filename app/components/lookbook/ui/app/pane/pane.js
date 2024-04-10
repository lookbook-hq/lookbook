import AlpineComponent from "@js/alpine/component";
import { getData } from "@js/alpine/utils";

export default AlpineComponent("pane", (id) => {
  return {
    activePanel: Alpine.$persist(null).as(`pane#${id}:active-panel`),

    init() {
      this.$nextTick(() => {
        if (this.activePanel === null && this.toolbar.tabs.length) {
          this.activePanel = this.toolbar.tabs[0].name;
        }
        this.toolbar.activeTab = this.activePanel;
      });
    },

    isActivePanel(name) {
      return this.activePanel === name;
    },

    get toolbar() {
      return getData(this.$root.querySelector("[data-component='toolbar']"));
    },

    bindings: {
      root: {
        ["@toolbar:tab-selected"](event) {
          this.activePanel = event.detail.name;
        },
      },
    },
  };
});
