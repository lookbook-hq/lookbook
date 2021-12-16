import sizeObserver from "./sizes";

export default function inspector() {
  return {
    width: 0,
    height: 0,
    init() {
      const ro = new ResizeObserver((entries) => {
        const rect = entries[0].contentRect;
        this.width = Math.round(rect.width);
        this.height = Math.round(rect.height);
      });
      ro.observe(this.$el);
      this.width = Math.round(this.$el.clientWidth);
      this.height = Math.round(this.$el.clientHeight);
    },
    get orientation() {
      return this.$store.inspector.drawer.orientation;
    },
    get view() {
      return this.$store.inspector.preview.view;
    },
    get horizontal() {
      return this.canBeVertical ? this.orientation === "horizontal" : true;
    },
    get vertical() {
      return !this.horizontal;
    },
    get canBeVertical() {
      return this.width > 800;
    },
    get drawerHidden() {
      return this.$store.inspector.drawer.hidden;
    },
    isActivePanel(panel) {
      return this.$store.inspector.drawer.active == panel;
    },
    switchPanel(panel) {
      this.$store.inspector.drawer.active = panel;
    },
    toggleView() {
      this.$store.inspector.preview.view =
        this.view === "html" ? "preview" : "html";
    },
    toggleOrientation() {
      this.$store.inspector.drawer.orientation =
        this.orientation === "horizontal" ? "vertical" : "horizontal";
    },
    toggleDrawer() {
      this.$store.inspector.drawer.hidden =
        !this.$store.inspector.drawer.hidden;
    },
    preview: {
      width: null,
      height: null,
    },
  };
}
