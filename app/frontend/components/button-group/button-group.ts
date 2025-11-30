import { LookbookElement } from "@lib/element.js";
import { customElement, html } from "@lib/lit.js";

import styles from "./button-group.css?text";

/**
 * <lb-button-group>
 *
 * @summary Button group component.
 */
@customElement("lb-button-group")
export class LookbookButtonGroup extends LookbookElement {
  static css = styles;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "lb-button-group": LookbookButtonGroup;
  }
}
