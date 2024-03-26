import AlpineComponent from "@js/alpine/component";

export default AlpineComponent("app", () => {
  return {
    sidebarPosition: Alpine.$persist(20).as("app:sidebar-position"),
    interactionStart() {
      this.$dispatch("lookbook:interaction-start");
    },
    interactionEnd() {
      this.$dispatch("lookbook:interaction-end");
    },
  };
});
