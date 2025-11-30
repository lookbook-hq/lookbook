import "@awesome.me/webawesome/dist/components/split-panel/split-panel.js";
import type WaSplitPanel from "@awesome.me/webawesome/dist/components/split-panel/split-panel.js";
import { uiDefaults } from "@config/frontend.js";
import { LookbookElement } from "@lib/element.js";
import { customElement, html, property, PropertyValues, query, state } from "@lib/lit.js";
import { Persistable } from "@mixins";

import styles from "./app.css?text";

/**
 * <lb-app>
 *
 * @summary Lookbook application UI shell.
 */
@customElement("lb-app")
export class LookbookApp extends Persistable(LookbookElement) {
  static css = styles;
  static persist = ["version", "splitPosition", "displayMode"];

  @property() version: string;
  @property({ type: Boolean, reflect: true }) dragging: boolean;
  @property({ type: Boolean, reflect: true, attribute: "has-active-popover" }) hasActivePopover: boolean;
  @property({ reflect: true, attribute: "display-mode" }) displayMode: "light" | "dark" = "light";

  @state() splitPosition: number = uiDefaults.app.splitPosition;
  @state() pointerdown: boolean;

  @query("#splitter") splitter: WaSplitPanel;

  protected updated(_changedProperties: PropertyValues): void {
    if (_changedProperties.has("displayMode")) {
      globalThis.displayMode = this.displayMode;
      this.dispatch("lb-display-mode-change", { mode: this.displayMode });
    }
  }

  handlePointerDown() {
    this.pointerdown = true;
  }

  handlePointerUp() {
    const wasDragging = this.dragging;
    this.pointerdown = false;
    this.dragging = false;
    if (wasDragging) {
      this.dispatch("lb-drag-end");
    }
  }

  handlePointerMove() {
    if (this.pointerdown) {
      this.dragging = true;
      this.dispatch("lb-drag-start");
    }
  }

  protected handleSplitChange() {
    this.splitPosition = this.splitter.positionInPixels ? this.splitter.positionInPixels : this.splitPosition;
  }

  protected toggleDisplayMode() {
    if (this.displayMode === "light") {
      this.displayMode = "dark";
    } else {
      this.displayMode = "light";
    }
  }

  render() {
    return html`
      <div id="header">
        <lb-header id="app-header">
          <slot
            name="logo"
            slot="logo"
          ></slot>
          <slot
            name="header-link"
            slot="link"
          ></slot>

          <lb-button
            id="appearance"
            slot="action"
            label="appearance"
            @click="${this.toggleDisplayMode}"
          >
            <lb-icon name="${this.displayMode === "light" ? "sun" : "moon-star"}"></lb-icon>
          </lb-button>
        </lb-header>
      </div>
      <wa-split-panel
        id="splitter"
        primary="start"
        position-in-pixels="${this.splitPosition}"
        @wa-reposition="${this.handleSplitChange}"
        @pointerdown=${this.handlePointerDown}
        @pointermove=${this.handlePointerMove}
        @pointerup=${this.handlePointerUp}
        @lb-popover-open="${() => (this.hasActivePopover = true)}"
        @lb-popover-close="${() => (this.hasActivePopover = false)}"
      >
        <div
          id="sidebar"
          slot="start"
        >
          <slot name="sidebar"></slot>
        </div>

        <div
          id="main"
          slot="end"
        >
          <slot></slot>
        </div>
      </wa-split-panel>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "lb-app": LookbookApp;
  }
}
