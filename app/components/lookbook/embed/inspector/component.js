import "iframe-resizer/js/iframeResizer";

export default function embedInspectorComponent(id, embedStore) {
  if (!embedStore[id]) {
    embedStore[id] = { width: "100%", height: "100%" };
  }

  return {
    resizer: null,

    get store() {
      return embedStore[id];
    },

    get iframe() {
      return this.$el.querySelector("iframe");
    },

    async loadResizer() {
      window.iFrameResize(
        {
          heightCalculationMethod: "lowestElement",
        },
        this.$el.querySelector("iframe")
      );
      this.resizer = this.iframe.iFrameResizer;
      this.resizer.resize();
      this.$dispatch("embed:resizer-loaded", { resizer: this.resizer });
    },

    resizeIframe() {
      this.iframe.iFrameResizer.resize();
    },

    morphComplete() {
      this.loadResizer();
      this.resizeIframe();
    },

    cleanup() {
      if (this.resizer) {
        this.resizer.removeListeners();
      }
    },
  };
}
