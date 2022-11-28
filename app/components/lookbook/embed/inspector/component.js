import "iframe-resizer/js/iframeResizer";

export default function embedInspectorComponent(id, embedStore) {
  if (!embedStore[id]) {
    embedStore[id] = { width: "100%", height: "100%" };
  }

  return {
    iframe: null,

    viewportHeight: 0,

    targetPath: window.location.pathname,

    get viewportCssHeight() {
      return this.viewportHeight ? `${this.viewportHeight}px` : "100%";
    },

    get store() {
      return embedStore[id];
    },

    init() {
      const onResized = this.onResized.bind(this);

      this.iframe = this.$el.querySelector("iframe");
      window.iFrameResize({ onResized, checkOrigin: false }, this.iframe);

      this.$watch("targetPath", (value) => this.switchTarget(value));
    },

    switchTarget(newTargetPath) {
      this.navigateTo(`${newTargetPath}${window.location.search}`);
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
