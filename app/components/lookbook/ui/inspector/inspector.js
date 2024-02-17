export default function inspector() {
  return {
    drawerPosition: Alpine.$persist(20).as("inspectorDrawerPosition"),

    init() {
      this.$logger.debug("Inspector component initialized");
    },
  };
}
