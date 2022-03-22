export default function filter() {
  return {
    get active() {
      return this.$store.filter.active;
    },
    focussed: false,
    checkEsc($event) {
      if ($event.key === "Escape") {
        this.active ? this.clear() : this.blur();
      }
    },
    clear() {
      this.$store.filter.raw = "";
    },
    focus($event) {
      if ($event && $event.target.tagName === "INPUT") {
        return;
      }
      setTimeout(() => {
        this.$dispatch("filter:focus");
        this.$nextTick(() => {
          this.focussed = true;
          this.$refs.input.focus();
        });
      }, 0);
    },
    blur() {
      setTimeout(() => {
        this.focussed = false;
        this.$refs.input.blur();
        this.$dispatch("filter:blur");
      }, 0);
    },
  };
}
