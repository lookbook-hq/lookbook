import { LookbookElement } from "@lib/element.js";
import { customElement, html, nothing, property } from "@lib/lit.js";

import { WithObservableSlots } from "@mixins";
import styles from "./blankslate.css?text";

/**
 * <lb-blankslate>
 *
 * @summary Empty state placeholder component.
 */
@customElement("lb-blankslate")
export class LookbookBlankslate extends WithObservableSlots(LookbookElement) {
  static css = styles;

  @property() icon: string;

  render() {
    return html`
      <div id="backdrop">
        <div id="content">
          <div id="icon">
            <slot name="icon">
              <lb-icon name="${this.icon}"></lb-icon>
            </slot>
          </div>
          ${this.whenSlotted(
            "title",
            html`<div id="title">
              <slot name="title"></slot>
            </div>`
          )}

          <div id="message">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "lb-blankslate": LookbookBlankslate;
  }
}
