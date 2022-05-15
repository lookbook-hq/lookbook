import config from "../config";
import { addMediaQueryListener } from "../helpers/layout";
import { log } from "../plugins/logger";

const { sidebar, main, inspector } = config;

export default function initLayoutStore(Alpine) {
  return {
    init() {
      addMediaQueryListener(
        `(min-width: ${config.desktopWidth}px)`,
        (matches) => {
          this._isDesktop = matches;
          log.debug(
            `Media query 'desktop': ${matches ? "✅ match" : "❌ no match"}`
          );
        }
      );

      addMediaQueryListener(
        `(min-width: ${config.wideDesktopWidth}px)`,
        (matches) => {
          this._isWideDesktop = matches;
          log.debug(
            `Media query 'wide desktop': ${
              matches ? "✅ match" : "❌ no match"
            }`
          );
        }
      );
    },

    get desktop() {
      return this._isDesktop;
    },

    get wideDesktop() {
      return this._isWideDesktop;
    },

    get mobile() {
      return !this.desktop;
    },

    reflowing: false,

    // Main app sidebar/content layout
    main: {
      split: Alpine.$persist({
        direction: "vertical",
        sizes: [`${sidebar.defaultWidth}px`, "1fr"],
      }).as("main-split"),

      opts: {
        minSizes: [sidebar.minWidth, main.minWidth],
      },
    },

    // Sidebar visibility and sections
    sidebar: {
      _hiddenDesktop: Alpine.$persist(false).as("sidebar-hidden-desktop"),

      _hiddenMobile: Alpine.$persist(true).as("sidebar-hidden-mobile"),

      set hidden(value) {
        if (Alpine.store("layout").desktop) {
          this._hiddenDesktop = value;
        } else {
          this._hiddenMobile = value;
        }
      },

      get hidden() {
        const isDesktop = Alpine.store("layout").desktop;
        return (
          (isDesktop && this._hiddenDesktop) ||
          (!isDesktop && this._hiddenMobile)
        );
      },

      split: Alpine.$persist({
        direction: "horizontal",
        sizes: ["50%", "50%"],
      }).as("sidebar-split"),

      opts: {
        minSizes: [sidebar.minSectionHeight, sidebar.minSectionHeight],
      },
    },

    // Inspector drawer/preview layout
    inspector: {
      split: Alpine.$persist({
        direction: "horizontal",
        horizontalSizes: ["1fr", `${inspector.drawer.defaultHeight}px`],
        verticalSizes: ["1fr", `${inspector.drawer.defaultWidth}px`],
      }).as("inspector-split"),

      opts: {
        minSizes: [sidebar.minWidth, main.minWidth],
      },
    },

    // protected

    _isDesktop: true,

    _isWideDesktop: true,
  };
}
