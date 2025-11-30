import { LookbookElement } from "@lib/element.js";
import { customElement, html, property, state } from "@lib/lit.js";
import { Persistable } from "@mixins";

import styles from "./page.css?text";

/**
 * <lb-page>
 *
 * @summary Page component.
 */
@customElement("lb-page")
export class LookbookPage extends LookbookElement {
  static css = styles;

  @property() title = "";

  render() {
    return html`
      <lb-toolbar
        id="toolbar"
        divider="block-end"
      >
        <div
          id="breadcrumb"
          slot="start"
        >
          <slot name="breadcrumb"></slot>
        </div>

        <lb-button-group slot="end">
          <slot name="toolbar-previous"></slot>
          <slot name="toolbar-next"></slot>
        </lb-button-group>
      </lb-toolbar>
      <article id="article">
        <div id="article-container">
          <header id="header">
            <h1 id="title">${this.title}</h1>
          </header>
          <div id="content">
            <lb-prose markdown>
              <slot></slot>
            </lb-prose>
          </div>
        </div>
      </article>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "lb-page": LookbookPage;
  }
}
