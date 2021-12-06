export default function preview() {
  return {
    onResize(e) {
      const size =
        this.resizeStartSize - (this.resizeStartPosition - e.pageX) * 2;
      const parentSize = this.$root.parentElement.clientWidth;
      const percentSize = (Math.round(size) / parentSize) * 100;
      const minWidth = (300 / parentSize) * 100;
      this.$store.inspector.preview.width = `${Math.min(
        Math.max(percentSize, minWidth),
        100
      )}%`;
    },
    onResizeStart(e) {
      this.$store.layout.reflowing = true;
      this.onResize = this.onResize.bind(this);
      this.onResizeEnd = this.onResizeEnd.bind(this);
      this.resizeStartPosition = e.pageX;
      this.resizeStartSize = this.$root.clientWidth;
      window.addEventListener("pointermove", this.onResize);
      window.addEventListener("pointerup", this.onResizeEnd);
    },
    onResizeEnd() {
      window.removeEventListener("pointermove", this.onResize);
      window.removeEventListener("pointerup", this.onResizeEnd);
      this.$store.layout.reflowing = false;
    },
    toggleFullWidth() {
      const preview = this.$store.inspector.preview;
      if (preview.width === "100%" && preview.lastWidth) {
        preview.width = preview.lastWidth;
      } else {
        preview.lastWidth = preview.width;
        preview.width = "100%";
      }
    },
  };
}
