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
    get pagesPanelHeight() {
      return this.$store.sidebar.pagesPanelHeight === 0
        ? window.innerHeight / 2
        : this.$store.sidebar.pagesPanelHeight;
    },
  };
}
