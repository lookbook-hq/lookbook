import morph from "./utils/morph";

export default function () {
  return {
    clearFilter() {
      this.$store.nav.filter = "";
    },
    init() {
      this.$watch("$store.nav.filter", (value) => {
        const nav = this.$store.nav;
        nav.filterText = value.replace(/\s/g, "").toLowerCase();
        nav.filtering = nav.filterText.length > 0;
      });
    },
    updateNav(event) {
      const nav = document.getElementById("nav");
      nav.style.height = `${this.$refs.shim.offsetHeight}px`;
      morph(nav, event.detail.doc.getElementById("nav"));
      Promise.resolve().then(() => {
        this.$refs.shim.style.height = "auto";
        this.$dispatch("nav:updated");
      });
    },
    navigate(path) {
      this.navigateTo(path instanceof Event ? path.currentTarget.href : path);
    },
    focusFilter($event) {
      if ($event.target.tagName === "INPUT") {
        return;
      }
      this.currentFocus = this.$refs.filter;
      setTimeout(() => this.$refs.filter.focus(), 0);
    },
    unfocusFilter() {
      this.$refs.filter.blur();
    },
  };
}
