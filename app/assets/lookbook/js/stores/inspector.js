import config from "../config";

export default function createInspectorStore(Alpine) {
  const { drawer, preview } = config.inspector;
  return {
    drawer: {
      orientation: Alpine.$persist(drawer.orientation).as("drawer-orientation"),
      active: Alpine.$persist(drawer.defaultPanel).as("drawer-active"),
      height: Alpine.$persist(drawer.defaultHeight).as("drawer-height"),
      width: Alpine.$persist(drawer.defaultWidth).as("drawer-width"),
      minWidth: drawer.minWidth,
      visibleTabCount: Infinity,
    },
    preview: {
      width: Alpine.$persist("100%").as("preview-width"),
      height: Alpine.$persist("100%").as("preview-height"),
      view: Alpine.$persist(preview.view).as("preview-view"),
      lastWidth: null,
    },
  };
}
