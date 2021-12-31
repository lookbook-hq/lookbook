import config from "../config";

export default function createInspectorStore(Alpine) {
  const { drawer, preview } = config.inspector;
  return {
    drawer: {
      hidden: Alpine.$persist(false).as("drawer-hidden"),
      orientation: Alpine.$persist(drawer.orientation).as("drawer-orientation"),
      panel: Alpine.$persist(drawer.defaultPanel).as("drawer-panel"),
      height: Alpine.$persist(drawer.defaultHeight).as("drawer-height"),
      width: Alpine.$persist(drawer.defaultWidth).as("drawer-width"),
      minWidth: drawer.minWidth,
      visibleTabCount: Infinity,
    },
    preview: {
      width: Alpine.$persist("100%").as("preview-width"),
      height: Alpine.$persist("100%").as("preview-height"),
      panel: Alpine.$persist(preview.defaultPanel).as("preview-panel"),
      lastWidth: null,
      lastHeight: null,
      resizing: false,
    },
  };
}
