import { install } from "@github/hotkey";
import Alpine from "alpinejs";
import Fern from "@ryangjchandler/fern";
import AlpineTooltip from "@ryangjchandler/alpine-tooltip";
import AlpineClipboard from "@ryangjchandler/alpine-clipboard";
import Screen from "./utils/screen";
import split from "./utils/split";
import page from "./page";
import workbench from "./workbench";
import preview from "./workbench/preview";
import inspector from "./workbench/inspector";
import nav from "./nav";
import navNode from "./nav/node";
import navLeaf from "./nav/leaf";
import sizeObserver from "./utils/size_observer";
import reloader from "./utils/reloader";
import clipboard from "./utils/clipboard";

window.Alpine = Alpine;

// Plugins

Alpine.plugin(Fern);
Alpine.plugin(AlpineTooltip);
Alpine.plugin(AlpineClipboard);
Alpine.plugin(Screen);

// Stores

Alpine.store("page", {
  reflowing: false,
  doc: window.document,
});

Alpine.persistedStore("nav", {
  width: 280,
  filter: "",
  open: {},
});

Alpine.persistedStore("inspector", {
  height: 200,
  active: "source",
});

Alpine.persistedStore("preview", {
  width: "100%",
});

// Components & utils

Alpine.data("page", page);
Alpine.data("nav", nav);
Alpine.data("navNode", navNode);
Alpine.data("navLeaf", navLeaf);
Alpine.data("workbench", workbench);
Alpine.data("preview", preview);
Alpine.data("inspector", inspector);
Alpine.data("clipboard", clipboard);
Alpine.data("sizeObserver", sizeObserver);
Alpine.data("split", split);

// Init

for (const el of document.querySelectorAll("[data-hotkey]")) {
  install(el);
}

if (window.SOCKET_PATH) {
  reloader(window.SOCKET_PATH).start();
}

window.Alpine = Alpine;
Alpine.start();
