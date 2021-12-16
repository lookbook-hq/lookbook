export default function preview() {
  return {
    get maxWidth() {
      const previewWidth = this.$store.inspector.preview.width;
      return previewWidth === "100%" ? "100%" : `${previewWidth}px`;
    },
    get maxHeight() {
      const previewHeight = this.$store.inspector.preview.height;
      return previewHeight === "100%" ? "100%" : `${previewHeight}px`;
    },
    get parentWidth() {
      return Math.round(this.$root.parentElement.clientWidth);
    },
    get parentHeight() {
      return Math.round(this.$root.parentElement.clientHeight);
    },
    onResizeStart(e) {
      this.onResizeWidthStart(e);
      this.onResizeHeightStart(e);
    },
    toggleFullSize() {
      const preview = this.$store.inspector.preview;
      if (preview.height === "100%" && preview.width === "100%") {
        this.toggleFullHeight();
        this.toggleFullWidth();
      } else {
        if (preview.height !== "100%") {
          this.toggleFullHeight();
        }
        if (preview.width !== "100%") {
          this.toggleFullWidth();
        }
      }
    },
    onResizeWidth(e) {
      const width =
        this.resizeStartWidth - (this.resizeStartPositionX - e.pageX) * 2;
      const boundedWidth = Math.min(
        Math.max(Math.round(width), 200),
        this.parentWidth
      );
      this.$store.inspector.preview.width =
        boundedWidth === this.parentWidth ? "100%" : boundedWidth;
    },
    onResizeWidthStart(e) {
      this.$store.layout.reflowing = true;
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
      this.$store.layout.reflowing = true;
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
      this.$store.layout.reflowing = false;
    },
    toggleFullHeight() {
      const preview = this.$store.inspector.preview;
      if (preview.height === "100%" && preview.lastHeight) {
        preview.height = preview.lastHeight;
      } else {
        preview.lastHeight = preview.height;
        preview.height = "100%";
      }
    },
  };
}
