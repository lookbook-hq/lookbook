export default function tabbedContentComponent(store) {
  return {
    get id() {
      return this.$root.id;
    },

    get sections() {
      return Array.from(this.$refs.sections.children);
    },

    isActive(el) {
      return store.activeTab === this._getRef(el);
    },

    // protected

    _getRef(el) {
      return el.getAttribute("x-ref");
    },
  };
}
