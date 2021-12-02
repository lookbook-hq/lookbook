export default function inspector() {
  return {
    isActiveTab(tab) {
      return this.$store.inspector.tabs.active === tab;
    },
    switchTab(tab) {
      this.$store.inspector.tabs.active = tab;
    },
    preview: {
      width: null,
      height: null,
    },
  };
}
