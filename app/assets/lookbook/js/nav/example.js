export default function navExample() {
  return {
    path: null,
    matchers: [],
    active: false,
    hidden: false,
    setActive() {
      this.active = this.path === window.location.pathname;
    },
    filter() {
      if (this.$store.nav.filtering) {
        const text = this.$store.nav.filterText;
        const matched = this.matchers.map((m) => m.includes(text));
        this.hidden = !matched.filter((m) => m).length;
      } else {
        this.hidden = false;
      }
    },
  };
}
