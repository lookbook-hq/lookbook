import { LookbookElement } from "@lib/element.js";
import { customElement, html, property } from "@lib/lit.js";

import styles from "./spec.css?text";

/**
 * <lb-spec>
 *
 * @summary Spec component.
 */
@customElement("lb-spec")
export class LookbookSpec extends LookbookElement {
  static css = styles;

  @property() heading: string;

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
            <h1 id="title">${this.heading}</h1>
          </header>
          <div id="content">
            <slot></slot>
          </div>
        </div>
      </article>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "lb-spec": LookbookSpec;
  }
}
