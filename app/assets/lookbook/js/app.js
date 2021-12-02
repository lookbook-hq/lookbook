import { install } from "@github/hotkey";
import Alpine from "alpinejs";
import Persist from "@alpinejs/persist";
import Morph from "@alpinejs/morph";
import Tooltip from "@ryangjchandler/alpine-tooltip";

import page from "./components/page";
import splitter from "./components/splitter";
import inspector from "./components/inspector";
import clipboard from "./components/clipboard";
import preview from "./components/preview";
import filter from "./components/filter";
import param from "./components/param";
import nav from "./components/nav";
import sizes from "./components/sizes";
import navLeaf from "./components/nav-leaf";
import navNode from "./components/nav-node";

import initFilterStore from "./stores/filter";
import initLayoutStore from "./stores/layout";
import initNavStore from "./stores/nav";
import initSidebarStore from "./stores/sidebar";
import initInspectorStore from "./stores/inspector";

// Plugins

Alpine.plugin(Persist);
Alpine.plugin(Morph);
Alpine.plugin(Tooltip);

// Stores

Alpine.store("filter", initFilterStore(Alpine));
Alpine.store("layout", initLayoutStore(Alpine));
Alpine.store("nav", initNavStore(Alpine));
Alpine.store("sidebar", initSidebarStore(Alpine));
Alpine.store("inspector", initInspectorStore(Alpine));

// Components

Alpine.data("page", page);
Alpine.data("splitter", splitter);
Alpine.data("preview", preview);
Alpine.data("clipboard", clipboard);
Alpine.data("inspector", inspector);
Alpine.data("filter", filter);
Alpine.data("param", param);
Alpine.data("sizes", sizes);
Alpine.data("nav", nav);
Alpine.data("navLeaf", navLeaf);
Alpine.data("navNode", navNode);

// Init

for (const el of document.querySelectorAll("[data-hotkey]")) {
  install(el);
}

window.Alpine = Alpine;
Alpine.start();
