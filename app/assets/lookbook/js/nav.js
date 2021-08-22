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
    updateMenu(event) {
      const menu = document.getElementById("menu");
      menu.style.height = `${this.$refs.shim.offsetHeight}px`;
      morph(menu, event.detail.doc.querySelector("#menu"));
      Promise.resolve().then(() => {
        this.$refs.shim.style.height = "auto";
        this.$dispatch("menu:updated");
      });
    },
    navigate($event) {
      history.pushState({}, null, $event.currentTarget.href);
      this.$dispatch("popstate");
    },
  };
}
