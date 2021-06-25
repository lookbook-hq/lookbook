import feather from "feather-icons";
import Alpine from "alpinejs";
import Fern from "@ryangjchandler/fern";
import Tooltip from "@ryangjchandler/alpine-tooltip";
import split from "./split";
import preview from "./preview";
import observeSize from "./size_observer";

window.Alpine = Alpine;
window.feather = feather;

Alpine.plugin(Fern);
Alpine.plugin(Tooltip);

// Data

Alpine.data("preview", preview);
Alpine.data("size-observer", observeSize);
window.split = split; // move into data component once Alpine supports passing arguments

// Stores

Alpine.store("app", { reflowing: false });
Alpine.persistedStore("nav", {
  width: 280,
  filter: "",
  open: {},
  scrollTop: 0,
  active: null,
});
Alpine.persistedStore("preview", {});
Alpine.persistedStore("inspector", {
  height: 200,
  active: "source",
});

// Kick things off...

document.addEventListener("alpine:initialized", () => {
  feather.replace();
});

Alpine.start();
