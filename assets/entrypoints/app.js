import "container-query-polyfill";
import Logger from "../js/logger";
import initAlpine from "../js/alpine/app";

const logger = new Logger("UI");

initAlpine({ logger });
