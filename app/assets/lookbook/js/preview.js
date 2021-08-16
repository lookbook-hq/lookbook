export default function preview() {
  const app = Alpine.store("app");
  const preview = Alpine.store("preview");
  return {
    init() {
      this.root = this.$el;
    },
    onResize(e) {
      const size =
        this.resizeStartSize - (this.resizeStartPosition - e.pageX) * 2;
      const parentSize = this.root.parentElement.clientWidth;
      const percentSize = (Math.round(size) / parentSize) * 100;
      const minWidth = (300 / parentSize) * 100;
      preview.width = `${Math.min(Math.max(percentSize, minWidth), 100)}%`;
    },
    onResizeStart(e) {
      app.reflowing = true;
      this.onResize = this.onResize.bind(this);
      this.onResizeEnd = this.onResizeEnd.bind(this);
      this.resizeStartPosition = e.pageX;
      this.resizeStartSize = this.root.clientWidth;
      window.addEventListener("pointermove", this.onResize);
      window.addEventListener("pointerup", this.onResizeEnd);
    },
    onResizeEnd(e) {
      window.removeEventListener("pointermove", this.onResize);
      window.removeEventListener("pointerup", this.onResizeEnd);
      app.reflowing = false;
    },
    handle: {
      ["@pointerdown"]: "onResizeStart",
      ["@dblclick"]() {
        if (preview.width === "100%" && preview.lastWidth) {
          preview.width = preview.lastWidth;
        } else {
          preview.lastWidth = preview.width;
          preview.width = "100%";
        }
      },
    },
  };
}

// export default function (dimension, store, { shrink = false, centered = false } = {}) {
//   const position = (e) => (dimension == "height" ? e.pageY : e.pageX);
//   const pane = {
//     onResize(e) {
//       let size =
//         this.resizeStartSize -
//         (shrink
//           ? (this.resizeStartPosition - position(e)) * (centered ? 2 : 1)
//           : (position(e) - this.resizeStartPosition) * (centered ? 2 : 1));
//       const parentSize =
//         dimension == "height"
//           ? this.$el.parentElement.clientHeight
//           : this.$el.parentElement.clientWidth;
//       const percentSize = (Math.round(size) / parentSize) * 100;
//       store[dimension] = `${Math.min(Math.max(percentSize, 0), 100)}%`;
//     },
//     onResizeStart(e) {
//       Spruce.store("app").reflowing = true;
//       this.resizeStartPosition = position(e);
//       this.resizeStartSize = dimension == "height" ? this.$el.clientHeight : this.$el.clientWidth;
//       this.onResize = this.onResize.bind(this);
//       this.onResizeEnd = this.onResizeEnd.bind(this);
//       window.addEventListener("pointermove", this.onResize);
//       window.addEventListener("pointerup", this.onResizeEnd);
//     },
//     onResizeEnd() {
//       Spruce.store("app").reflowing = false;
//       window.removeEventListener("pointermove", this.onResize);
//       window.removeEventListener("pointerup", this.onResizeEnd);
//     },
//   };
//   return pane;
// };
