export default function sizeObserver() {
  return {
    width: 0,
    height: 0,
    init() {
      const ro = new ResizeObserver((entries) => {
        const rect = entries[0].contentRect;
        this.width = Math.round(rect.width);
        this.height = Math.round(rect.height);
      });
      ro.observe(this.$el);
      this.width = Math.round(this.$el.clientWidth);
      this.height = Math.round(this.$el.clientHeight);
    },
  };
}
