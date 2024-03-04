import "container-query-polyfill";
import Logger from "../js/logger";
import Router from "../js/router";
import initShoelace from "../js/shoelace";
import initAlpine from "../js/alpine";

const router = new Router("app", window.LOOKBOOK_SSE_ENDPOINT);
const logger = new Logger("view");

initShoelace({ router, logger });
initAlpine({ router, logger });
