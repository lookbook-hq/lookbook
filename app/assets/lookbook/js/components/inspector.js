export default function inspector() {
  return {
    get orientation() {
      return this.$store.inspector.drawer.orientation;
    },
    get view() {
      return this.$store.inspector.preview.view;
    },
    get horizontal() {
      return this.orientation == "horizontal";
    },
    get vertical() {
      return !this.horizontal;
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
    preview: {
      width: null,
      height: null,
    },
  };
}
