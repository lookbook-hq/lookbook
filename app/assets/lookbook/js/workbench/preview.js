export default function preview() {
  const app = Alpine.store("page");
  const preview = Alpine.store("preview");
  return {
    init() {
      this.root = this.$el;
    },
    onResize(e) {
      const size =
        this.resizeStartSize - (this.resizeStartPosition - e.pageX) * 2;
      const parentSize = this.root.parentElement.clientWidth;
      const percentSize = (Math.round(size) / parentSize) * 100;
      const minWidth = (300 / parentSize) * 100;
      preview.width = `${Math.min(Math.max(percentSize, minWidth), 100)}%`;
    },
    onResizeStart(e) {
      app.reflowing = true;
      this.onResize = this.onResize.bind(this);
      this.onResizeEnd = this.onResizeEnd.bind(this);
      this.resizeStartPosition = e.pageX;
      this.resizeStartSize = this.root.clientWidth;
      window.addEventListener("pointermove", this.onResize);
      window.addEventListener("pointerup", this.onResizeEnd);
    },
    onResizeEnd() {
      window.removeEventListener("pointermove", this.onResize);
      window.removeEventListener("pointerup", this.onResizeEnd);
      app.reflowing = false;
    },
    toggleFullWidth() {
      if (preview.width === "100%" && preview.lastWidth) {
        preview.width = preview.lastWidth;
      } else {
        preview.lastWidth = preview.width;
        preview.width = "100%";
      }
    },
  };
}
