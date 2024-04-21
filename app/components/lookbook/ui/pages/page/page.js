import AlpineComponent from "@js/alpine/component";
import PageUpdater from "@js/page_updater";

export default AlpineComponent("page", () => {
  return {
    updater: null,

    init() {
      this.updater = new PageUpdater(this.$el, "[data-component='page']");
    },

    handleMessage(event) {
      try {
        const data = JSON.parse(event.data);
        if (data.action === "page:update") {
          this.updater.updateDOM(location);
        }
      } catch {}
    },
  };
});
