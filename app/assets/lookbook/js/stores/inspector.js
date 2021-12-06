import config from "../config";

export default function createInspectorStore(Alpine) {
  const { tabs } = config.inspector;
  return {
    panels: {
      active: Alpine.$persist(tabs.default).as("inspector-panel-active"),
      height: Alpine.$persist(tabs.defaultHeight).as("inspector-height"),
    },
    preview: {
      width: Alpine.$persist("100%").as("preview-width"),
      height: Alpine.$persist("100%").as("preview-height"),
      source: Alpine.$persist(false).as("preview-source"),
      lastWidth: null,
    },
  };
}
