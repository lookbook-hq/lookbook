import AlpineComponent from "@js/alpine/component";

export default AlpineComponent("pageViewport", () => {
  return {
    init() {
      this.$logger.debug("Page viewport initialized", this.$el);
    },

    handleMessage(event) {
      try {
        const data = JSON.parse(event.data);
        if (data.action === "visit") {
          this.$dispatch("lookbook:visit", { url: data.url });
        }
      } catch {}
    },

    reload() {
      this.$refs.iframe.contentWindow.location.reload(true);
    },
  };
});
