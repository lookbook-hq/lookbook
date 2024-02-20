import Alpine from "alpinejs";
import morph from "@alpinejs/morph";
import persist from "@alpinejs/persist";
import Logger from "../logger";
import Router from "../router";
import * as components from "../../../app/components/lookbook/ui/**/*.js";

function registerComponents(entries) {
  for (const key in entries) {
    const entry = entries[key];
    if (entry.__esModule === true && "default" in entry) {
      Alpine.data(entry.default.name, entry.default);
    } else {
      registerComponents(entry);
    }
  }
}

window.Alpine = Alpine;

Alpine.plugin(morph);
Alpine.plugin(persist);

Alpine.magic("logger", () => new Logger("View"));
Alpine.magic("router", () => new Router("app"));

registerComponents(components);

Alpine.start();
