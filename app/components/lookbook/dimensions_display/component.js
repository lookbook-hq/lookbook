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
      this.observer = new ResizeObserver((entries) => {
        const rect = entries[0].contentRect;
        this.width = Math.round(rect.width);
        this.height = Math.round(rect.height);
      });
      console.log(document.querySelector(targetSelector));
      this.observer.observe(document.querySelector(targetSelector));
    },

    tearDown() {
      this.observer.disconnect();
    },
  };
}
