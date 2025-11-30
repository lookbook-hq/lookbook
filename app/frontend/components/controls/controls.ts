import { LookbookElement } from "@lib/element.js";
import { customElement, html, state } from "@lib/lit.js";

import styles from "./controls.css?text";

/**
 * <lb-controls>
 *
 * @summary Preview controls component.
 */
@customElement("lb-controls")
export class LookbookControls extends LookbookElement {
  static css = styles;

  @state() controls = [];

  handleSlotChange(event) {
    this.controls = Array.from(event.target.assignedElements()).filter(
      (el: HTMLElement) => el.localName === "lb-control"
    );
  }

  render() {
    return html`
      <div id="scroller">
        <slot @slotchange="${this.handleSlotChange}"></slot>
        <div
          id="blankslate"
          ?hidden="${this.controls.length}"
        >
          <slot name="blankslate"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "lb-controls": LookbookControls;
  }
}
