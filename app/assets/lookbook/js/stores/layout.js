import config from "../config";

export default function createLayoutStore() {
  return {
    init() {
      this.desktop = window.innerWidth >= config.desktopWidth;
    },
    reflowing: false,
    desktop: true,
    desktopWidth: config.desktopWidth,
    get mobile() {
      return !this.desktop;
    },
  };
}
