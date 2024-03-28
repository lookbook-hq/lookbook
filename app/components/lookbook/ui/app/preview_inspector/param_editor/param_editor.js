import AlpineComponent from "@js/alpine/component";

export default AlpineComponent("paramEditor", ({ name, value }) => {
  return {
    name,
    value,

    init() {
      this.$watch("value", () => this.update());
    },

    update() {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set(this.name, this.value);
      const path = location.href.replace(location.search, "");
      this.$dispatch("lookbook:visit", {
        url: `${path}?${searchParams.toString()}`,
      });
    },
  };
});
