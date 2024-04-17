import "iframe-resizer/js/iframeResizer";
import AlpineComponent from "@js/alpine/component";
import { getData } from "@js/alpine/utils";

export default AlpineComponent("previewEmbed", () => {
  return {
    init() {
      const onResized = this.onResized.bind(this);

      window.iFrameResize(
        { onResized, checkOrigin: false },
        this.viewport.iframe
      );
    },

    onResized({ height }) {
      if (height) {
        this.viewport.height = height;

        // Notify parent window of height resize so the parent window can implement
        // its own iframe resize strategy if not using the Lookbook JS script.
        // Uses Embedly-compatible postMessage format: https://docs.embed.ly/reference/provider-height-resizing
        window.parent.postMessage(
          JSON.stringify({
            src: window.location.toString(),
            context: "iframe.resize",
            height,
          }),
          "*"
        );
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
