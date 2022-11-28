import "iframe-resizer/js/iframeResizer";

export default function embedInspectorComponent(id, embedStore) {
  if (!embedStore[id]) {
    embedStore[id] = { width: "100%", height: "100%" };
  }

  return {
    iframe: null,

    viewportHeight: 0,

    get viewportCssHeight() {
      return this.viewportHeight ? `${this.viewportHeight}px` : "100%";
    },

    get store() {
      return embedStore[id];
    },

    init() {
      this.iframe = this.$el.querySelector("iframe");
      const onResized = this.onResized.bind(this);
      window.iFrameResize({ onResized, checkOrigin: false }, this.iframe);
    },

    onResized({ height }) {
      if (height) {
        this.viewportHeight = height;
      }
    },

    resizeIframe() {
      this.iframe.iFrameResizer.resize();
    },
  };
}
