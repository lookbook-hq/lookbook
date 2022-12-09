import "iframe-resizer/js/iframeResizer";

export default function embedComponent() {
  return {
    iframe: null,

    cssHeight: "auto",

    loadResizer() {
      this.iframe = window.iFrameResize(
        {
          autoResize: true,

          checkOrigin: false,

          onInit: () => {
            this.resizeIframe();
          },

          onResized: ({ height }) => {
            if (height > 0) {
              this.cssHeight = `${height}px`;
            }
          },
        },
        this.$refs.inspector
      )[0];
    },

    resizeIframe() {
      this.iframe.iFrameResizer.resize();
    },
  };
}
