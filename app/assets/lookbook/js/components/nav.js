import { getAlpineData } from "../lib/utils";

export default function nav() {
  return {
    empty: false,
    init() {
      this.$watch("$store.filter.text", () => this.filter());
      this.$nextTick(() => {
        this.setActive();
        this.filter();
      });
    },
    filter() {
      this.empty = true;
      this.getChildren().forEach((child) => {
        const data = getAlpineData(child);
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
    setActive() {
      const target = this.$el.querySelector(
        `[data-path="${window.location.pathname}"]`
      );
      this.$store.nav.active = target ? target.id : "";
    },
  };
}
