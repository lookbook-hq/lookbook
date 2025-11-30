import type { LookbookButton } from "@components";
import { LookbookElement } from "@lib/element.js";
import { customElement, html, nothing, property, PropertyValues, queryAssignedElements } from "@lib/lit.js";

import styles from "./menu.css?text";

/**
 * <lb-menu>
 *
 * @summary Menu component.
 */
@customElement("lb-menu")
export class LookbookMenu extends LookbookElement {
  static css = styles;

  @property() label: string;

  @queryAssignedElements({ selector: "lb-button" }) buttons: NodeList;

  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    Array.from(this.buttons).forEach((button: LookbookButton) => {
      button.setAttribute("appearance", "menu-item");
    });
  }

  render() {
    return html`
      ${this.label ? html`<h4 id="label">${this.label}</h4>` : nothing}
      <div id="items">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "lb-menu": LookbookMenu;
  }
}
