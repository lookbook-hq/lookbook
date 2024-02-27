import AlpineComponent from "@js/alpine/component";

export default AlpineComponent("navTreeItem", () => {
  return {
    async init() {
      this.$el.expanded = this.expanded.includes(this.$el.getAttribute("key"));
    },
  };
});
