import AlpineComponent from "@js/alpine/component";

export default AlpineComponent("previewInspector", () => {
  return {
    drawerPosition: Alpine.$persist(20).as("preview-inspector:drawer-position"),
    drawerLastPosition: Alpine.$persist(20).as(
      "preview-inspector:drawer-last-position"
    ),

    init() {
      this.$watch("drawerPosition", (value) => {
        if (value !== 0) {
          this.drawerLastPosition = value;
        }
      });
    },

    openDrawer() {
      this.$refs.splitter.position = this.drawerLastPosition;
    },

    closeDrawer() {
      this.drawerLastPosition = this.drawerPosition;
      this.$refs.splitter.position = 0;
    },

    get drawerClosed() {
      return this.drawerPosition === 0;
    },
  };
});
