import WaTooltip from "@awesome.me/webawesome/dist/components/tooltip/tooltip.js";
import { customElement } from "@lib/lit.js";

import styles from "./tooltip.css?text";

/**
 * <lb-tooltip>
 *
 * @summary Tooltip component. Just a thin wrapper around the WebAwesome tooltip component.
 */
@customElement("lb-tooltip")
export class LookbookTooltip extends WaTooltip {
  static css = [WaTooltip.css, styles];

  firstUpdated(): void {
    super.firstUpdated();
    if (!this.slot) this.setAttribute("slot", "tooltip");
    if (!this.hasAttribute("show-delay")) this.setAttribute("show-delay", "500");
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "lb-tooltip": LookbookTooltip;
  }
}
