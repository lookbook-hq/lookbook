export default function inspector() {
  return {
    drawerPosition: Alpine.$persist(20).as("inspectorDrawerPosition"),
  };
}
