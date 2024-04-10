import AlpineComponent from "@js/alpine/component";
import { getData } from "@js/alpine/utils";

export default AlpineComponent("toolbar", () => {
  return {
    activeTab: null,

    selectTab(name) {
      this.activeTab = name;
      this.$dispatch("toolbar:tab-selected", { name });
    },

    isActive(name) {
      return this.activeTab === name;
    },

    get tabs() {
      const childNodes = this.$refs.tabs ? this.$refs.tabs.children : [];
      return Array.from(childNodes).map((child) => getData(child));
    },
  };
});
