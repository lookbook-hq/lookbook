import { LookbookElement } from "@lib/element.js";
import { customElement, html, property, PropertyValues } from "@lib/lit.js";

import styles from "./header.css?text";

/**
 * <lb-header>
 *
 * @summary Lookbook application header.
 */
@customElement("lb-header")
export class LookbookHeader extends LookbookElement {
  static css = styles;

  @property({ attribute: "homepath" }) homePath: string;

  render() {
    return html`
      <div id="container">
        <a
          href="${this.homePath}"
          id="logo"
        >
          <slot name="logo"></slot>
        </a>

        <div id="links">
          <slot name="link"></slot>
        </div>

        <lb-button-group
          id="actions"
          divider="inline-start"
        >
          <slot name="action"></slot>
        </lb-button-group>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "lb-header": LookbookHeader;
  }
}
