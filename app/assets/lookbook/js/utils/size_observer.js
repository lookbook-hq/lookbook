export default function sizeObserver() {
  return {
    observedWidth: 0,
    observedHeight: 0,
    init() {
      const ro = new ResizeObserver((entries) => {
        const rect = entries[0].contentRect;
        this.observedWidth = Math.round(rect.width);
        this.observedHeight = Math.round(rect.height);
      });
      ro.observe(this.$el);
      this.observedWidth = Math.round(this.$el.clientWidth);
      this.observedHeight = Math.round(this.$el.clientHeight);
    },
  };
}
