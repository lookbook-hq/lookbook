export default function filter() {
  return {
    get active() {
      return this.$store.filter.active;
    },
    checkEsc($event) {
      if ($event.key === "Escape") {
        this.active ? this.clear() : this.blur();
      }
    },
    clear() {
      this.$store.filter.raw = "";
    },
    focus() {
      setTimeout(() => this.$refs.input.focus(), 0);
    },
    blur() {
      setTimeout(() => this.$refs.input.blur(), 0);
    },
  };
}
