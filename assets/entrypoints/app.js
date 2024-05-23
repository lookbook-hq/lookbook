import "container-query-polyfill";
import Logger from "@js/logger";
import initAlpine from "@js/alpine/app";
import "@js/elements/embed";
import "@js/tippy";

const logger = new Logger("UI");

initAlpine({ logger });
