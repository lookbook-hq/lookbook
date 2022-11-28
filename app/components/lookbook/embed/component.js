import "iframe-resizer/js/iframeResizer";

export default function embedComponent() {
  return {
    height: 0,

    get cssHeight() {
      return this.height ? `${this.height}px` : "auto";
    },

    init() {
      const onResized = this.onResized.bind(this);
      window.iFrameResize(
        {
          autoResize: true,
          checkOrigin: false,
          onResized,
        },
        this.$refs.inspector
      );
    },

    onResized({ height }) {
      if (height) {
        this.height = height;
      }
    },
  };
}
