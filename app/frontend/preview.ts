import { dispatchMessage } from "@lib/postmessage.js";
import { getBodyHeight, isFramed } from "@lib/utils.js";

let lastHeight = 0;

function observeViewportSize() {
  const resizeObserver = new ResizeObserver((entries) => {
    const { contentRect } = entries[0];
    const height = Math.max(Math.round(contentRect.height), getBodyHeight());

    if (height !== lastHeight && isFramed()) {
      lastHeight = height;
      dispatchMessage("lb-height-change", { data: { height } });
    }
  });

  resizeObserver.observe(document.body);
}

document.addEventListener("DOMContentLoaded", () => observeViewportSize());
