import "iframe-resizer/js/iframeResizer";

export default function embedComponent() {
  return {
    height: 0,

    get cssHeight() {
      return this.height ? `${this.height}px` : "auto";
    },

    init() {
      const onResized = this.onResized.bind(this);
      const opts = {
        autoResize: true,
        onResized,
      };
      window.iFrameResize(opts, this.$refs.iframe);
    },

    onResized({ height }) {
      this.height = height;
    },
  };
}
