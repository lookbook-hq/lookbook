export default function tabsComponent(store) {
  const initial = store.activeTab || null;
  return {
    get tabs() {
      return Array.from(this.$refs.tabs.children);
    },

    init() {
      this.$nextTick(() => {
        const initialTab = initial
          ? this.tabs.find((t) => this._getRef(t) === initial)
          : this.tabs[0];
        this.selectTab(initialTab);
      });
    },

    selectTab(el) {
      store.activeTab = this._getRef(el);
    },

    isSelected(el) {
      return store.activeTab === this._getRef(el);
    },

    isDisabled(el) {
      return el.getAttribute("data-disabled") == "true";
    },

    onSelect() {
      // if (typeof opts.onSelect === "function") opts.onSelect(selected);
      // this.$dispatch("tabs:selected", {
      //   tabs: this.id,
      //   selected: store.activeTab,
      // });
    },

    // protected

    _getRef(el) {
      return el.getAttribute("x-ref");
    },
  };
}
