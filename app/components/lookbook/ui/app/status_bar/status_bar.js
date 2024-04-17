import AlpineComponent from "@js/alpine/component";

export default AlpineComponent("statusBar", () => {
  return {
    reset() {
      Alpine.store("app").clear();
      window.location.reload();
      this.$logger.info(`Local storage cleared`);
    },
  };
});
