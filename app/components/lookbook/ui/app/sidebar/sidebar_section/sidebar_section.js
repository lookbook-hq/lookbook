import AlpineComponent from "@js/alpine/component";
import { getData } from "@js/alpine/utils";

export default AlpineComponent("sidebarSection", () => {
  return {
    collapseAll() {
      if (this.navTree) this.navTree.collapseAll();
    },

    get navTree() {
      const el = this.$root.querySelector("[data-component='nav-tree']");
      return el ? getData(el) : null;
    },
  };
});
