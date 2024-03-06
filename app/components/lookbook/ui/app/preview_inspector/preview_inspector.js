import AlpineComponent from "@js/alpine/component";

export default AlpineComponent("previewInspector", () => {
  return {
    drawerPosition: Alpine.$persist(20).as("preview-inspector:drawer-position"),

    hideDrawer() {
      console.log("drawer hidden!");
    },
  };
});
