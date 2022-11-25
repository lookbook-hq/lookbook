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

    get resizer() {
      return this.iframe ? this.iframe.iFrameResizer : null;
    },

    get store() {
      return embedStore[id];
    },

    init() {
      const iframeEl = this.$el.querySelector("iframe");
      const onResized = this.onResized.bind(this);
      this.iframe = window.iFrameResize({ onResized }, iframeEl)[0];
    },

    onResized({ height }) {
      if (height) {
        this.viewportHeight = height;
      }
    },

    resizeIframe() {
      if (this.resizer) {
        this.resizer.resize();
      }
    },
  };
}
