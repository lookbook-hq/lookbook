import AlpineComponent from "@js/alpine/component";

export default AlpineComponent("inspector", () => {
  return {
    drawerPosition: Alpine.$persist(20).as("inspector:drawer-position"),

    init() {
      this.$logger.debug("Inspector initialized", this.$el);
    },

    hideDrawer() {
      console.log("drawer hidden!");
    },
  };
});
