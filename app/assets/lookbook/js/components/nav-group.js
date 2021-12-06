import { getAlpineData } from "../lib/utils";

export default function navGroup() {
  return {
    hidden: false,
    children: [],
    get id() {
      return this.$root.id;
    },
    get open() {
      return this.$store.nav.isOpen(this.id);
    },
    toggle() {
      this.$store.nav.toggle(this.id);
    },
    getChildren() {
      return this.$refs.items
        ? Array.from(this.$refs.items.querySelectorAll(":scope > li"))
        : [];
    },
    navigateToFirstChild() {
      if (this.open) {
        const child = this.firstVisibleChild();
        if (child) {
          const link = child.querySelector(":scope > a.nav-link");
          if (link) {
            this.setLocation(link.getAttribute("href"));
          }
        }
      }
    },
    filter(text) {
      this.hidden = true;
      this.getChildren().forEach((child) => {
        const data = getAlpineData(child);
        data.filter(text);
        if (!data.hidden) {
          this.hidden = false;
        }
      });
    },
    firstVisibleChild() {
      return this.getChildren().find((child) => {
        return child._x_dataStack
          ? child._x_dataStack[0].hidden === false
          : false;
      });
    },
  };
}
