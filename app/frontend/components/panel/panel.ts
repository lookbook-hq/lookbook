import type { LookbookDataChangeEvent } from "@events";
import { LookbookElement } from "@lib/element.js";
import { customElement, html, property, PropertyValues } from "@lib/lit.js";
import { hasChanged } from "@lib/utils.js";
import { startCase } from "es-toolkit";

import styles from "./panel.css?text";

/**
 * <lb-panel>
 *
 * @summary Lookbook panel element.
 */
@customElement("lb-panel")
export class LookbookPanel extends LookbookElement {
  static css = styles;

  @property() name: string;
  @property() label: string;
  @property({ type: Number }) surface = 1;
  @property({ hasChanged }) data: any;
  @property({ reflect: true, type: Boolean }) active: boolean = false;
  @property({ reflect: true, type: Boolean }) visible: boolean = false;

  firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.label = this.label || startCase(this.name);
    this.role = this.role || "tabpanel";
  }

  handleDataChange(event: LookbookDataChangeEvent) {
    this.data = event.detail.value;
  }

  render() {
    return html`
      <div
        id="container"
        @lb-data="${(event: LookbookDataChangeEvent) => this.handleDataChange(event)}"
      >
        <div id="scroller">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "lb-panel": LookbookPanel;
  }
}
