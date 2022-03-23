import config from "../config";

export default function createSidebarStore(Alpine) {
  const { defaultWidth, minWidth, maxWidth } = config.sidebar;
  return {
    open: Alpine.$persist(true).as("sidebar-open"),
    width: Alpine.$persist(defaultWidth).as("sidebar-width"),
    panelSplits: Alpine.$persist([1.0, 1.0]).as(`sidebar-panel-splits`),
    minWidth,
    maxWidth,
    toggle() {
      Alpine.store("sidebar").open = !Alpine.store("sidebar").open;
    },
  };
}
