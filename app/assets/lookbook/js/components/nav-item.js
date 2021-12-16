export default function navItem(matchers) {
  return {
    hidden: false,
    get id() {
      return this.$root.id;
    },
    get path() {
      return this.$root.getAttribute("data-path");
    },
    get active() {
      return this.$store.nav.active === this.id;
    },
    navigate() {
      this.setLocation(this.path);
      this.$store.sidebar.open = false;
    },
    filter(text) {
      this.hidden = false;
      if (text.length) {
        const matched = matchers.map((m) => m.includes(text));
        this.hidden = !matched.filter((m) => m).length;
      } else {
        this.hidden = false;
      }
    },
  };
}
