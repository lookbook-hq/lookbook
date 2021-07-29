import Alpine from "alpinejs";
import Fern from "@ryangjchandler/fern";
import Tooltip from "@ryangjchandler/alpine-tooltip";
import Clipboard from "@ryangjchandler/alpine-clipboard";
import split from "./split";
import preview from "./preview";
import observeSize from "./size_observer";
import reloader from "./reloader";

// Plugins

Alpine.plugin(Fern);
Alpine.plugin(Tooltip);
Alpine.plugin(Clipboard);

// Data

Alpine.data("preview", preview);
Alpine.data("sizeObserver", observeSize);
Alpine.data("split", split);

// Stores

Alpine.store("app", { reflowing: false });
Alpine.persistedStore("nav", {
  width: 280,
  filter: "",
  open: {},
  scrollTop: 0,
});
Alpine.persistedStore("preview", {});
Alpine.persistedStore("inspector", {
  height: 200,
  active: "source",
});

// Init

window.Alpine = Alpine;
reloader(window.SOCKET_PATH).start();
Alpine.start();
