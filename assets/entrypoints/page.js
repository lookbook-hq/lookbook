import "container-query-polyfill";
import Logger from "../js/logger";
import initShoelace from "../js/shoelace/page";
import initAlpine from "../js/alpine/page";

const logger = new Logger("page");

const base = document.createElement("base");
base.setAttribute("target", "_parent");
document.body.prepend(base);

initShoelace({ logger });
initAlpine({ logger });
