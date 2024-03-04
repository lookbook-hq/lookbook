import "container-query-polyfill";
import ServerEventsListener from "../js/server_events_listener";
import Logger from "../js/logger";
import Router from "../js/router";
import initShoelace from "../js/shoelace";
import initAlpine from "../js/alpine";

const router = new Router("app");
const logger = new Logger("View");

initShoelace({ router, logger });
initAlpine({ router, logger });

// Hijack navigation clicks
addEventListener("click", (event) => {
  const link = event.target.closest("[href]");
  if (link) {
    event.preventDefault();
    router.visit(link.href);
  }
});

// Handle history navigation
window.addEventListener("popstate", () => router.visit(window.location, false));

// Listen out for update events from the server
if (window.LOOKBOOK_SSE_ENDPOINT) {
  const listener = new ServerEventsListener(window.LOOKBOOK_SSE_ENDPOINT);
  listener.on("update", () => router.updatePage());
  listener.start();

  addEventListener("visibilitychange", () => {
    if (!document.hidden) router.updatePage();
  });
}
