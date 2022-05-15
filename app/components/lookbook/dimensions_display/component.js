import { observeSize } from "@helpers/layout";

export default function dimensionsDisplayComponent(targetSelector) {
  return {
    width: 0,

    height: 0,

    resizing: false,

    init() {
      const target = document.querySelector(targetSelector);
      this.width = Math.round(target.clientWidth);
      this.height = Math.round(target.clientHeight);
      this.createObserver();
    },

    createObserver() {
      this.observer = observeSize(
        document.querySelector(targetSelector),
        ({ width, height }) => {
          this.width = width;
          this.height = height;
        }
      );
    },

    tearDown() {
      this.observer.disconnect();
    },
  };
}
