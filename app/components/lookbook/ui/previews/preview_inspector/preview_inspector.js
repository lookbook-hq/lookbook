import AlpineComponent from "@js/alpine/component";

export default AlpineComponent("previewInspector", () => {
  return {
    drawerClosed: false,

    openDrawer() {
      this.drawerClosed = false;
    },

    closeDrawer() {
      this.drawerClosed = true;
    },
  };
});
