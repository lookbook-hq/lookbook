import AlpineComponent from "@js/alpine/component";

export default AlpineComponent("reader", () => {
  return {
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
