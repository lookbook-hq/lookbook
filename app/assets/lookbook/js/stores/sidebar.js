import config from "../config";

export default function createSidebarStore(Alpine) {
  const { defaultWidth, minWidth, maxWidth } = config.sidebar;
  return {
    open: Alpine.$persist(true).as("sidebar-open"),
    width: Alpine.$persist(defaultWidth).as("sidebar-width"),
    pagesPanelHeight: Alpine.$persist(0).as(`sidebar-pages-panel-height`),
    minWidth,
    maxWidth,
    toggle() {
      Alpine.store("sidebar").open = !Alpine.store("sidebar").open;
    },
  };
}
