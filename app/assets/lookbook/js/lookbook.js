import Alpine from "alpinejs";

import Morph from "@alpinejs/morph";
import Persist from "@alpinejs/persist";
import Collapse from "@alpinejs/morph";
import Tooltip from "@ryangjchandler/alpine-tooltip";

import Logger, { log } from "./plugins/logger";

import initLayoutStore from "./stores/layout";
import initNavStore from "./stores/nav";
import initInspectorStore from "./stores/inspector";
import initPagesStore from "./stores/pages";
import initWorkbenchStore from "./stores/workbench";

import app from "./app";

// Note: A ParcelJS issue prevents loading all depths of component JS files in one glob
import { getComponents } from "./helpers/build";
import * as componentScripts from "../../../components/lookbook/*/component.js";
import * as subComponentScripts from "../../../components/lookbook/*/*/component.js";

// Plugins

Alpine.plugin(Morph);
Alpine.plugin(Persist);
Alpine.plugin(Collapse);
Alpine.plugin(Tooltip);
Alpine.plugin(Logger);

// Stores

Alpine.store("layout", initLayoutStore(Alpine));
Alpine.store("nav", initNavStore(Alpine));
Alpine.store("inspector", initInspectorStore(Alpine));
Alpine.store("pages", initPagesStore(Alpine));

if (process.env.NODE_ENV !== "production") {
  Alpine.store("workbench", initWorkbenchStore(Alpine));
}

// Components

Alpine.data("app", app);

[componentScripts, subComponentScripts].forEach((scripts) => {
  const components = getComponents(scripts);
  Object.keys(components).forEach((name) => {
    Alpine.data(`${name}Component`, components[name]);
  });
});

// Init

window.log = log;
window.Alpine = Alpine;
Alpine.start();
