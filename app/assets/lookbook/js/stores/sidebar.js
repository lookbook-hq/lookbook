import config from "../config";

export default function createSidebarStore(Alpine) {
  const { defaultWidth, minWidth, maxWidth } = config.sidebar;
  return {
    open: Alpine.$persist(false).as("sidebar-open"),
    width: Alpine.$persist(defaultWidth).as("sidebar-width"),
    minWidth,
    maxWidth,
    toggle() {
      this.open = !this.open;
    },
  };
}
