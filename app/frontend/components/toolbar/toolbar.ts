import "@awesome.me/webawesome/dist/components/tooltip/tooltip.js";

import { LookbookElement } from "@lib/element.js";
import { customElement, html, property } from "@lib/lit.js";

import styles from "./toolbar.css?text";

/**
 * <lb-toolbar>
 *
 * @summary Lookbook toolbar element.
 */
@customElement("lb-toolbar")
export class LookbookToolbar extends LookbookElement {
  static css = styles;

  @property({ reflect: true }) divider: string;

  render() {
    return html`
      <div
        id="container"
        part="container"
        class="flex-row"
      >
        <div id="start">
          <slot name="start"></slot>
        </div>
        <div id="end">
          <slot name="end"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "lb-toolbar": LookbookToolbar;
  }
}
