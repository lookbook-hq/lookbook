import "iframe-resizer/js/iframeResizer";

export default function embedComponent(id, embedStore) {
  if (!embedStore[id]) {
    embedStore[id] = { width: "100%", height: "100%" };
  }

  return {
    tab: "preview",

    resizer: null,

    get store() {
      return embedStore[id];
    },

    async loadResizer() {
      window.iFrameResize(
        {
          heightCalculationMethod: "lowestElement",
        },
        this.$el.querySelector("iframe")
      );
      this.resizer = this.$el.querySelector("iframe").iFrameResizer;
      this.resizer.resize();
      this.$dispatch("embed:resizer-loaded", { resizer: this.resizer });
    },

    resizeIframe() {
      this.$el.querySelector("iframe").iFrameResizer.resize();
    },

    cleanup() {
      if (this.resizer) {
        this.resizer.removeListeners();
      }
    },
  };
}
