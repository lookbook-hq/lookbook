import "container-query-polyfill";
import Logger from "../js/logger";
import initAlpine from "../js/alpine/page";

const logger = new Logger("page");

// set base element for links
const base = document.createElement("base");
base.setAttribute("target", "_parent");
document.body.prepend(base);

// Hijack navigation clicks
addEventListener("click", (event) => {
  const link = event.target.closest("[href]");
  if (link) {
    const isExternalLink = link.host && link.host !== window.location.host;
    if (!isExternalLink && !link.hasAttribute("target")) {
      event.preventDefault();
      window.parent.postMessage(
        JSON.stringify({ action: "visit", url: link.href }),
        "*"
      );
    }
  }
});

initAlpine({ logger });
