import "iframe-resizer/js/iframeResizer";

export default function embedPreview() {
  return {
    init() {
      this.resizer = window.iFrameResize(
        {},
        this.$refs.iframe
      )[0].iFrameResizer;
    },
    lastWidth: null,
    reflowing: false,
    set width(value) {
      if (!this.$store.pages.embeds[this.$root.id]) {
        this.$store.pages.embeds[this.$root.id] = { width: "100%" };
      }
      this.$store.pages.embeds[this.$root.id].width = value;
    },
    get width() {
      return this.$store.pages.embeds[this.$root.id]
        ? this.$store.pages.embeds[this.$root.id].width
        : "100%";
    },
    get parentWidth() {
      return Math.round(this.$root.parentElement.clientWidth);
    },
    get maxWidth() {
      return this.width === "100%" ? "100%" : `${this.width}px`;
    },
    onResizeWidth(e) {
      const width =
        this.resizeStartWidth - (this.resizeStartPositionX - e.pageX);
      const boundedWidth = Math.min(
        Math.max(Math.round(width), 200),
        this.parentWidth
      );
      this.width = boundedWidth === this.parentWidth ? "100%" : boundedWidth;
      this.resizer.resize();
    },
    onResizeWidthStart(e) {
      this.reflowing = true;
      this.onResizeWidth = this.onResizeWidth.bind(this);
      this.onResizeWidthEnd = this.onResizeWidthEnd.bind(this);
      this.resizeStartPositionX = e.pageX;
      this.resizeStartWidth = this.$refs.resizer.clientWidth;
      window.addEventListener("pointermove", this.onResizeWidth);
      window.addEventListener("pointerup", this.onResizeWidthEnd);
    },
    onResizeWidthEnd() {
      window.removeEventListener("pointermove", this.onResizeWidth);
      window.removeEventListener("pointerup", this.onResizeWidthEnd);
      this.reflowing = false;
    },
    toggleFullWidth() {
      if (this.width === "100%" && this.lastWidth) {
        this.width = this.lastWidth;
      } else {
        this.lastWidth = this.width;
        this.width = "100%";
      }
    },
  };
}
