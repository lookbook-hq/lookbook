import AlpineComponent from "@js/alpine/component";

export default AlpineComponent("pageBrowser", () => {
  return {
    handleMessage(event) {
      try {
        const data = JSON.parse(event.data);
        if (data.action === "visit") {
          this.$dispatch("lookbook:visit", { url: data.url });
        }
      } catch {}
    },

    notifyUpdateRequired() {
      this.iframeWindow.postMessage(
        JSON.stringify({ action: "page:update" }),
        "*"
      );
    },

    reload() {
      this.iframeWindow.location.reload(true);
    },

    get iframeWindow() {
      return this.$refs.iframe.contentWindow;
    },
  };
});
