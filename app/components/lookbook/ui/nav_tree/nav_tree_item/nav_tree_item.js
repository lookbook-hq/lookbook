export default function navTreeItem() {
  return {
    async init() {
      this.$el.expanded = this.expanded.includes(this.$el.getAttribute("key"));
    },
  };
}
