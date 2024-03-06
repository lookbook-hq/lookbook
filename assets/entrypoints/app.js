import "container-query-polyfill";
import Logger from "../js/logger";
import Router from "../js/router";
import initShoelace from "../js/shoelace/app";
import initAlpine from "../js/alpine/app";

const router = new Router(window.LOOKBOOK_SSE_ENDPOINT);
const logger = new Logger("UI");

initShoelace({ router, logger });
initAlpine({ router, logger });
