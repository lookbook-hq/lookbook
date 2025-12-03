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

  protected handleClick(event) {
    if (event.target.hasAttribute("href")) {
      this.dispatch("lb-command", "visit", { url: event.target.href });
      event.preventDefault();
    }
  }

  render() {
    return html`
      <nav id="container">
        <ol
          id="items"
          @click="${this.handleClick}"
        >
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
