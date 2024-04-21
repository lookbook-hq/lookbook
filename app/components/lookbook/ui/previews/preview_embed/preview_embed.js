import "iframe-resizer/js/iframeResizer";
import AlpineComponent from "@js/alpine/component";
import { getData } from "@js/alpine/utils";
import { observeSize } from "@js/helpers";

export default AlpineComponent("previewEmbed", () => {
  return {
    init() {
      const onIframeResized = this.onIframeResized.bind(this);

      window.iFrameResize(
        { onIframeResized, checkOrigin: false },
        this.viewport.iframe
      );

      observeSize(this.$el, this.onResize);
    },

    onResize({ height }) {
      window.parent.postMessage(
        JSON.stringify({
          action: "embed:resize",
          height,
        }),
        "*"
      );
    },

    onIframeResized({ height }) {
      if (height) {
        this.viewport.height = height;
      }
    },

    resizeIframe() {
      this.viewport.iframe.iFrameResizer.resize();
    },

    get viewport() {
      return getData(this.$root.querySelector("[data-component='viewport']"));
    },
  };
});
