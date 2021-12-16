export default function preview() {
  return {
    get store() {
      return this.$store.inspector.preview;
    },
    get maxWidth() {
      return this.store.width === "100%" ? "100%" : `${this.store.width}px`;
    },
    get maxHeight() {
      return this.store.height === "100%" ? "100%" : `${this.store.height}px`;
    },
    get parentWidth() {
      return Math.round(this.$root.parentElement.clientWidth);
    },
    get parentHeight() {
      return Math.round(this.$root.parentElement.clientHeight);
    },
    start() {
      this.$store.layout.reflowing = true;
      this.store.resizing = true;
    },
    end() {
      this.$store.layout.reflowing = false;
      this.store.resizing = false;
    },
    onResizeStart(e) {
      this.onResizeWidthStart(e);
      this.onResizeHeightStart(e);
    },
    toggleFullSize() {
      const { height, width } = this.store;
      if (height === "100%" && width === "100%") {
        this.toggleFullHeight();
        this.toggleFullWidth();
      } else {
        if (height !== "100%") this.toggleFullHeight();
        if (width !== "100%") this.toggleFullWidth();
      }
    },
    onResizeWidth(e) {
      const width =
        this.resizeStartWidth - (this.resizeStartPositionX - e.pageX) * 2;
      const boundedWidth = Math.min(
        Math.max(Math.round(width), 200),
        this.parentWidth
      );
      this.store.width =
        boundedWidth === this.parentWidth ? "100%" : boundedWidth;
    },
    onResizeWidthStart(e) {
      this.start();
      this.onResizeWidth = this.onResizeWidth.bind(this);
      this.onResizeWidthEnd = this.onResizeWidthEnd.bind(this);
      this.resizeStartPositionX = e.pageX;
      this.resizeStartWidth = this.$root.clientWidth;
      window.addEventListener("pointermove", this.onResizeWidth);
      window.addEventListener("pointerup", this.onResizeWidthEnd);
    },
    onResizeWidthEnd() {
      window.removeEventListener("pointermove", this.onResizeWidth);
      window.removeEventListener("pointerup", this.onResizeWidthEnd);
      this.end();
    },
    toggleFullWidth() {
      const { width, lastWidth } = this.store;
      if (width === "100%" && lastWidth) {
        this.store.width = lastWidth;
      } else {
        this.store.lastWidth = width;
        this.store.width = "100%";
      }
    },
    onResizeHeight(e) {
      const height =
        this.resizeStartHeight - (this.resizeStartPositionY - e.pageY);
      const boundedHeight = Math.min(
        Math.max(Math.round(height), 200),
        this.parentHeight
      );
      this.$store.inspector.preview.height =
        boundedHeight === this.parentHeight ? "100%" : boundedHeight;
    },
    onResizeHeightStart(e) {
      this.start();
      this.onResizeHeight = this.onResizeHeight.bind(this);
      this.onResizeHeightEnd = this.onResizeHeightEnd.bind(this);
      this.resizeStartPositionY = e.pageY;
      this.resizeStartHeight = this.$root.clientHeight;
      window.addEventListener("pointermove", this.onResizeHeight);
      window.addEventListener("pointerup", this.onResizeHeightEnd);
    },
    onResizeHeightEnd() {
      window.removeEventListener("pointermove", this.onResizeHeight);
      window.removeEventListener("pointerup", this.onResizeHeightEnd);
      this.end();
    },
    toggleFullHeight() {
      const { height, lastHeight } = this.store;
      if (height === "100%" && lastHeight) {
        this.store.height = lastHeight;
      } else {
        this.store.lastHeight = height;
        this.store.height = "100%";
      }
    },
  };
}
