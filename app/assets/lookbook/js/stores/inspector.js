export default function initInspectorStore(Alpine) {
  return {
    minVerticalSplitWidth: 800,

    preview: {
      activeTab: Alpine.$persist("").as("inspector-preview-active-tab"),
      width: Alpine.$persist("100%").as("inspector-preview-width"),
      height: Alpine.$persist("100%").as("inspector-preview-height"),
      lastWidth: null,
      lastHeight: null,
      resizing: false,
    },

    drawer: {
      hidden: Alpine.$persist(false).as("inspector-drawer-hidden"),
      activeTab: Alpine.$persist("").as("inspector-drawer-active-tab"),
    },
  };
}
