export default function nav(filterable = true) {
  return {
    empty: false,
    init() {
      if (filterable) {
        this.$watch("$store.filter.text", () => this.filter());
        this.$nextTick(() => {
          this.filter();
        });
      }
    },
    filter() {
      this.empty = true;
      this.getChildren().forEach((child) => {
        const data = Alpine.$data(child);
        data.filter(this.$store.filter.text);
        if (!data.hidden) {
          this.empty = false;
        }
      });
    },
    getChildren() {
      return this.$refs.items
        ? Array.from(this.$refs.items.querySelectorAll(":scope > li > div"))
        : [];
    },
  };
}
