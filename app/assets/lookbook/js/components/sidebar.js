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
  };
}
