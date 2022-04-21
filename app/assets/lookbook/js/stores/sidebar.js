import config from "../config";

export default function createSidebarStore(Alpine) {
  const { defaultWidth, minWidth, maxWidth } = config.sidebar;
  return {
    openDesktop: Alpine.$persist(true).as("sidebar-open-desktop"),
    openMobile: Alpine.$persist(false).as("sidebar-open-mobile"),
    width: Alpine.$persist(defaultWidth).as("sidebar-width"),
    panelSplits: Alpine.$persist([1.0, 1.0]).as(`sidebar-panel-splits`),
    minWidth,
    maxWidth,
    get open() {
      return Alpine.store("sidebar")[
        Alpine.store("layout").desktop ? "openDesktop" : "openMobile"
      ];
    },
    toggle() {
      const sidebar = Alpine.store("sidebar");
      if (Alpine.store("layout").desktop) {
        sidebar.openDesktop = !sidebar.openDesktop;
      } else {
        sidebar.openMobile = !sidebar.openMobile;
      }
    },
  };
}
