import AlpineComponent from "@js/alpine/component";
import { getData } from "@js/alpine/utils";

export default AlpineComponent("toolbar", () => {
  return {
    set activeTab(value) {
      if (this.tabGroup) this.tabGroup.activeTab = value;
    },

    get tabGroup() {
      return getData(
        this.$root.querySelector("[data-component='toolbar-tab-group']")
      );
    },

    get tabs() {
      return this.tabGroup ? this.tabGroup.tabs : [];
    },
  };
});
