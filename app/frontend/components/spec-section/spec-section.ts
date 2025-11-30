import { LookbookElement } from "@lib/element.js";
import { customElement, html, nothing, property } from "@lib/lit.js";

import sharedProseStyles from "@styles/prose.css?text";
import styles from "./spec-section.css?text";

/**
 * <lb-spec-section>
 *
 * @summary Part of a `lb-spec` component.
 */
@customElement("lb-spec-section")
export class LookbookSpecSection extends LookbookElement {
  static css = [sharedProseStyles, styles];

  @property() heading: string;
  @property() link: string;

  render() {
    return html`
      <section id="container">
        ${this.heading
          ? html`
            <header
              id="header"
              class="lb-prose"
            >
              <div id="header-container">
              <h2
                id="title"
                class="lookbook-h4"
              >
                <a href="${this.link}">${this.heading}</a>
              </h2>
              <lb-toolbar id="toolbar">
                <lb-button-group slot="end">
                  <lb-button id="copy-permalink">
                    <lb-icon name="link"></lb-icon>
                    <lb-tooltip>Copy permalink</lb-tooltip>
                  </lb-button>
                  <lb-button
                    id="reload-preview"
                    href="${this.link}"
                  >
                    <lb-icon name="square-dashed-mouse-pointer"></lb-icon>
                    <lb-tooltip placement="top">Open in inspector</lb-tooltip>
                  </lb-button>
                </lb-button-group>
              </lb-toolbar>
            </header>
        `
          : nothing}

        <div id="content">
          <div id="content-container">
            <slot name="notes"></slot>
            <slot name="preview"></slot>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "lb-spec-section": LookbookSpecSection;
  }
}
