import { LookbookElement } from "@lib/element.js";
import { customElement, html, nothing, property } from "@lib/lit.js";

import styles from "./sidebar.css?text";

/**
 * <lb-sidebar>
 *
 * @summary Lookbook application sidebar.
 */
@customElement("lb-sidebar")
export class LookbookSidebar extends LookbookElement {
  static css = styles;

  @property() label?: string;
  @property() icon?: string;

  render() {
    return html`
      <div id="container">
        <lb-toolbar
          id="toolbar"
          divider="block-end"
        >
          <div slot="start">
            ${this.label
              ? html`
                  <h4 id="label">
                    ${this.icon ? html`<lb-icon name="${this.icon}"></lb-icon>` : nothing} ${this.label}
                  </h4>
                `
              : nothing}
          </div>
          <lb-button-group slot="end">
            <lb-button id="filter-nav-items">
              <lb-icon name="search"></lb-icon>
              <lb-tooltip>Filter by keyword</lb-tooltip>
            </lb-button>
            <lb-button id="collapse-all-nav-items">
              <lb-icon name="list-chevrons-down-up"></lb-icon>
              <lb-tooltip>Collapse all folders</lb-tooltip>
            </lb-button>
          </lb-button-group>
        </lb-toolbar>
        <div id="nav">
          <slot name="nav"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "lb-sidebar": LookbookSidebar;
  }
}
