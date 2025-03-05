import "@iframe-resizer/parent";
import AlpineComponent from "@js/alpine/component";
import { getData } from "@js/alpine/utils";
import { observeSize } from "@js/helpers";

export default AlpineComponent("previewEmbed", () => {
  return {
    viewport: null,

    init() {
      this.$nextTick(() => {
        this.viewport = getData(
          this.$el.querySelector("[data-component='viewport']")
        );

        const onIframeResized = this.onIframeResized.bind(this);

        window.iFrameResize(
          {
            license: "GPLv3",
            onIframeResized,
            checkOrigin: false,
            waitForLoad: false,
          },
          this.viewport.iframe
        );

        observeSize(this.$el, this.onResize);
      });
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

    get iframe() {
      return this.viewport.iframe;
    },

    get iFrameResizer() {
      return this.iframe.iFrameResizer;
    },

    resizeIframe() {
      this.iFrameResizer.resize();
    },
  };
});
