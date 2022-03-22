import { install } from "@github/hotkey";
import Alpine from "alpinejs";
import Persist from "@alpinejs/persist";
import Morph from "@alpinejs/morph";
import Tooltip from "@ryangjchandler/alpine-tooltip";

import app from "./components/app";
import page from "./components/page";
import inspector from "./components/inspector";
import previewWindow from "./components/preview-window";
import filter from "./components/filter";
import param from "./components/param";
import sidebar from "./components/sidebar";
import nav from "./components/nav";
import navItem from "./components/nav-item";
import navGroup from "./components/nav-group";
import splitter from "./components/splitter";
import tabs from "./components/tabs";
import copy from "./components/copy";
import code from "./components/code";
import sizes from "./components/sizes";
import embed from "./components/embed";

import initFilterStore from "./stores/filter";
import initLayoutStore from "./stores/layout";
import initNavStore from "./stores/nav";
import initSidebarStore from "./stores/sidebar";
import initInspectorStore from "./stores/inspector";
import initPagesStore from "./stores/pages";

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
Alpine.store("pages", initPagesStore(Alpine));

// Components

Alpine.data("app", app);
Alpine.data("page", page);
Alpine.data("sidebar", sidebar);
Alpine.data("splitter", splitter);
Alpine.data("previewWindow", previewWindow);
Alpine.data("copy", copy);
Alpine.data("code", code);
Alpine.data("inspector", inspector);
Alpine.data("filter", filter);
Alpine.data("param", param);
Alpine.data("sizes", sizes);
Alpine.data("nav", nav);
Alpine.data("tabs", tabs);
Alpine.data("navItem", navItem);
Alpine.data("navGroup", navGroup);
Alpine.data("embed", embed);

// Init

for (const el of document.querySelectorAll("[data-hotkey]")) {
  install(el);
}

window.Alpine = Alpine;
Alpine.start();
