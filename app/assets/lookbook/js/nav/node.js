export default function navNode() {
  return {
    id: null,
    hidden: true,
    children: [],
    init() {
      this.id = this.$el.id;
    },
    open() {
      return this.$store.nav.open[this.id];
    },
    getChildren() {
      return this.$refs.items
        ? Array.from(this.$refs.items.querySelectorAll(":scope > li"))
        : [];
    },
    navigateToFirstChild() {
      if (this.open()) {
        const child = this.firstVisibleChild();
        if (child) {
          const link = child.querySelector(":scope > a.nav-link");
          if (link) {
            this.navigate(link.getAttribute("href"));
          }
        }
      }
    },
    filter() {
      this.hidden = true;
      this.getChildren().forEach((child) => {
        const data = child._x_dataStack[0];
        data.filter();
        if (!data.hidden) {
          this.hidden = false;
        }
      });
    },
    toggle() {
      this.$store.nav.open[this.id] = !this.$store.nav.open[this.id];
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
