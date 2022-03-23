export default function sidebar() {
  return {
    init() {
      this.$nextTick(() => this.setActiveNavItem());
    },
    setActiveNavItem() {
      const target = this.$el.querySelector(
        `[data-path="${window.location.pathname}"]`
      );
      this.$store.nav.active = target ? target.id : "";
    },
    setSplits(splits) {
      if (splits.length) {
        this.$store.sidebar.panelSplits = [splits[0] || 1.0, splits[2] || 1.0];
      }
    },
  };
}
