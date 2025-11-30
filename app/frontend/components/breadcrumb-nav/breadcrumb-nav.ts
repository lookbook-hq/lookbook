import { LookbookElement } from "@lib/element.js";
import { customElement, html, nothing, state, unsafeHTML } from "@lib/lit.js";

import styles from "./breadcrumb-nav.css?text";

/**
 * <lb-breadcrumb-nav>
 *
 * @summary Breadcrumb nav component.
 */
@customElement("lb-breadcrumb-nav")
export class LookbookBreadcrumbNav extends LookbookElement {
  static css = styles;

  @state() items = [];

  protected handleSlotChange({ target }) {
    this.items = Array.from(target.assignedElements());
  }

  render() {
    return html`
      <nav id="container">
        <ol id="items">
          ${this.items.map(
            (item) => html`
              <li class="item">${unsafeHTML(item.outerHTML)}</li>
              ${item !== this.items[0] && item !== this.items[this.items.length - 1]
                ? html`<li class="divider">/</li>`
                : nothing}
            `
          )}
        </ol>
      </nav>
      <slot
        @slotchange="${this.handleSlotChange}"
        hidden
      ></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "lb-breadcrumb-nav": LookbookBreadcrumbNav;
  }
}
