import "container-query-polyfill";
import Logger from "../js/logger";
import initShoelace from "../js/shoelace/app";
import initAlpine from "../js/alpine/app";

const logger = new Logger("UI");

initShoelace({ logger });
initAlpine({ logger });
