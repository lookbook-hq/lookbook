import AlpineComponent from "@js/alpine/component";
import { observeSize } from "@js/helpers";
import Alpine from "alpinejs";

export default AlpineComponent(
  "viewport",
  (id, opts = { minWidth: 200, minHeight: 200 }) => {
    const store = Alpine.store("app").fetch("viewport", id, {
      width: "100%",
      height: "100%",
      lastWidth: "100%",
      lastHeight: "100%",
    });

    return {
      minWidth: opts.minWidth,
      minHeight: opts.minHeight,
      iframeDimensions: {},
      resizing: false,

      init() {
        this.onResizeWidth = this.onResizeWidth.bind(this);
        this.onResizeWidthEnd = this.onResizeWidthEnd.bind(this);
        this.onResizeHeight = this.onResizeHeight.bind(this);
        this.onResizeHeightEnd = this.onResizeHeightEnd.bind(this);

        observeSize(this.$refs.iframe, ({ width, height }) => {
          this.iframeDimensions = {
            width: Math.round(width),
            height: Math.round(height),
          };
        });
      },

      start() {
        this.resizing = true;
        this.$dispatch("viewport:resize-start");
      },

      stop() {
        this.resizing = false;
        this.$dispatch("viewport:resize-end");
      },

      onResizeStart(e) {
        this.onResizeWidthStart(e);
        this.onResizeHeightStart(e);
      },

      toggleFullSize() {
        if (this.height === "100%" && store.width === "100%") {
          this.toggleFullHeight();
          this.toggleFullWidth();
        } else {
          if (this.height !== "100%") this.toggleFullHeight();
          if (store.width !== "100%") this.toggleFullWidth();
        }
      },

      onResizeWidth(e) {
        const width =
          this.resizeStartWidth - (this.resizeStartPositionX - e.pageX) * 2;
        const boundedWidth = Math.min(
          Math.max(Math.round(width), this.minWidth),
          this.parentWidth
        );
        store.width = boundedWidth === this.parentWidth ? "100%" : boundedWidth;
        this.$dispatch("viewport:resize-progress");
      },

      onResizeWidthStart(e) {
        this.start();
        this.resizeStartPositionX = e.pageX;
        this.resizeStartWidth = this.$refs.wrapper.clientWidth;
        addEventListener("pointermove", this.onResizeWidth);
        addEventListener("pointerup", this.onResizeWidthEnd);
      },

      onResizeWidthEnd() {
        removeEventListener("pointermove", this.onResizeWidth);
        removeEventListener("pointerup", this.onResizeWidthEnd);
        this.stop();
      },

      toggleFullWidth() {
        if (store.width === "100%") {
          store.width = this.lastWidth;
        } else {
          this.lastWidth = store.width;
          store.width = "100%";
        }
      },

      onResizeHeight(e) {
        const height =
          this.resizeStartHeight - (this.resizeStartPositionY - e.pageY);
        const boundedHeight = Math.min(
          Math.max(Math.round(height), this.minHeight),
          this.parentHeight
        );
        this.height =
          boundedHeight === this.parentHeight ? "100%" : boundedHeight;
        this.$dispatch("viewport:resize-progress");
      },

      onResizeHeightStart(e) {
        this.start();
        this.resizeStartPositionY = e.pageY;
        this.resizeStartHeight = this.$refs.wrapper.clientHeight;
        addEventListener("pointermove", this.onResizeHeight);
        addEventListener("pointerup", this.onResizeHeightEnd);
      },

      onResizeHeightEnd() {
        removeEventListener("pointermove", this.onResizeHeight);
        removeEventListener("pointerup", this.onResizeHeightEnd);
        this.stop();
      },

      toggleFullHeight() {
        if (this.height === "100%") {
          this.height = this.lastHeight;
        } else {
          this.lastHeight = this.height;
          this.height = "100%";
        }
      },

      reload() {
        this.$refs.iframe.contentlocation.reload();
      },

      get displayWidth() {
        return `${this.iframeDimensions.width}px`;
      },

      get displayHeight() {
        return `${this.iframeDimensions.height}px`;
      },

      get maxWidth() {
        return store.width === "100%" ? "100%" : `${store.width}px`;
      },

      get maxHeight() {
        return this.height === "100%" ? "100%" : `${this.height}px`;
      },

      get parentWidth() {
        return Math.round(this.$root.clientWidth);
      },

      get parentHeight() {
        return Math.round(this.$root.clientHeight);
      },

      get inert() {
        return this.resizing || this.reflowing;
      },

      get iframe() {
        return this.$refs.iframe;
      },

      destroy() {
        if (this.iframe.iFrameResizer) {
          this.iFrameResizer.disconnect();
        }
      },
    };
  }
);
