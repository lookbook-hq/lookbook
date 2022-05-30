import { prefixString } from "../helpers/string";

export default function initInspectorStore(Alpine, { prefix }) {
  return {
    minVerticalSplitWidth: 800,

    preview: {
      activeTab: Alpine.$persist("").as(
        prefixString("inspector-preview-active-tab", prefix)
      ),
      width: Alpine.$persist("100%").as(
        prefixString("inspector-preview-width", prefix)
      ),
      height: Alpine.$persist("100%").as(
        prefixString("inspector-preview-height", prefix)
      ),
      lastWidth: null,
      lastHeight: null,
      resizing: false,
    },

    drawer: {
      hidden: Alpine.$persist(false).as(
        prefixString("inspector-drawer-hidden", prefix)
      ),
      activeTab: Alpine.$persist("").as(
        prefixString("inspector-drawer-active-tab", prefix)
      ),
    },
  };
}
