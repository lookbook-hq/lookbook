export default function inspector() {
  return {
    isActivePanel(panel) {
      return this.$store.inspector.panels.active == panel;
    },
    switchPanel(panel) {
      this.$store.inspector.panels.active = panel;
    },
    get showSource() {
      return this.$store.inspector.preview.source;
    },
    toggleSource() {
      this.$store.inspector.preview.source =
        !this.$store.inspector.preview.source;
    },
    preview: {
      width: null,
      height: null,
    },
  };
}
