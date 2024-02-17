export default function tabGroup(id) {
  return {
    activeTab: Alpine.$persist("").as(`${id}:active-tab`),

    async init() {
      this.$watch("activeTab", (tabName) => {
        this.$dispatch("lookbook:tab-selected", {
          tabGroup: this,
          activeTab: this.activeTab,
        });
        this.$logger.debug(`${id}: '${this.activeTab}' tab selected`);
      });
      await this.selectTab();
      this.$logger.debug("Tab group component initialized");
    },

    async selectTab() {
      if (this.activeTab) {
        await this.tabGroup.updateComplete;
        this.tabGroup.show(this.activeTab);
      } else {
        return this.getInitialActiveTab();
      }
    },

    async getInitialActiveTab() {
      await this.tabsReady;
      setTimeout(() => {
        const activeTab = this.tabs.find((tab) => tab.active);
        if (activeTab) this.activeTab = activeTab.panel;
      }, 1);
    },

    get tabGroup() {
      return this.$root.querySelector("sl-tab-group");
    },

    get tabs() {
      return Array.from(this.tabGroup.querySelectorAll("sl-tab"));
    },

    get tabsReady() {
      return Promise.all(this.tabs.map((tab) => tab.updateComplete));
    },
  };
}
