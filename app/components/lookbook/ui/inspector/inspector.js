export default function inspector() {
  return {
    drawerPosition: Alpine.$persist(20).as("inspector:drawer-position"),

    init() {
      this.$logger.debug("Inspector component initialized");
    },
  };
}
