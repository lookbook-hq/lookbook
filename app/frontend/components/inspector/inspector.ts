import "@awesome.me/webawesome/dist/components/popover/popover.js";
import "@awesome.me/webawesome/dist/components/popup/popup.js";
import "@awesome.me/webawesome/dist/components/split-panel/split-panel.js";
import type WaSplitPanel from "@awesome.me/webawesome/dist/components/split-panel/split-panel.js";
import "@components/button-group/button-group.js";
import "@components/icon/icon.js";
import "@components/toolbar/toolbar.js";
import "@components/viewport/viewport.js";

import { uiDefaults } from "@config/frontend.js";
import { LookbookElement } from "@lib/element.js";
import { customElement, html, property, query, state } from "@lib/lit.js";
import { Hotkeyable, Persistable } from "@mixins";

import { arrayConverter } from "@lib/utils.js";
import { uniq, without } from "es-toolkit";
import styles from "./inspector.css?text";

const defaults = uiDefaults.inspector;

/**
 * <lb-inspector>
 *
 * @summary Scenario inspector with preview window and customisable drawer and sidebar panels.
 */
@customElement("lb-inspector")
export class LookbookInspector extends Hotkeyable(Persistable(LookbookElement)) {
  static css = styles;
  static persist = ["drawerSplit", "sidebarSplit", "panes"];

  @property({ attribute: false, type: Array, converter: arrayConverter })
  panes: string[] = ["sidebar", "drawer"];

  @state() drawerSplit: number = defaults.drawerSplit;
  @state() sidebarSplit: number = defaults.sidebarSplit;

  @query("#drawer-splitter") drawerSplitter: WaSplitPanel;
  @query("#sidebar-splitter") sidebarSplitter: WaSplitPanel;

  @state()
  protected get sidebar() {
    return this.panes && this.panes.includes("sidebar");
  }

  @state()
  protected get drawer() {
    return this.panes && this.panes.includes("drawer");
  }

  connectedCallback(): void {
    super.connectedCallback();

    // TODO: make hotkeys configurable
    this.registerHotkey("ctrl+`", (event) => {
      this.togglePanel("drawer");
      event.preventDefault();
    });
  }

  protected togglePanel(name: "drawer" | "sidebar") {
    this.panes = this.panes.includes(name) ? without(this.panes, name) : uniq([...this.panes, name]);
  }

  public toggleMaximizedViewport() {
    this.panes = this.panes.length ? [] : ["sidebar", "drawer"];
  }

  protected handleDrawerSplitChange() {
    if (this.drawerSplitter) {
      this.drawerSplit = this.drawerSplitter.positionInPixels ? this.drawerSplitter.positionInPixels : this.drawerSplit;
    }
  }

  protected handleSidebarSplitChange() {
    if (this.sidebarSplitter) {
      this.sidebarSplit = this.sidebarSplitter.positionInPixels
        ? this.sidebarSplitter.positionInPixels
        : this.sidebarSplit;
    }
  }

  renderPreviewWithSidebar() {
    return html`
      <wa-split-panel
        id="sidebar-splitter"
        orientation="horizontal"
        primary="end"
        position-in-pixels="${this.sidebarSplit}"
        @wa-reposition="${this.handleSidebarSplitChange}"
      >
        <div slot="start">
          <slot></slot>
        </div>
        <lb-icon
          name="grip-vertical"
          slot="divider"
        ></lb-icon>
        <lb-panels
          id="sidebar-panels"
          persist-as="inspector.sidebar.panels"
          class="pane"
          slot="end"
        >
          <lb-button-group slot="action">
            <lb-button
              id="close-this-sidebar"
              @click="${() => this.togglePanel("sidebar")}"
            >
              <lb-icon name="x"></lb-icon>
              <lb-tooltip placement="top-end">Hide sidebar</lb-tooltip>
            </lb-button>
          </lb-button-group>
          <slot name="sidebar"></slot>
        </lb-panels>
      </wa-split-panel>
    `;
  }

  protected renderPreviewWithDrawer() {
    return html`
      <wa-split-panel
        id="drawer-splitter"
        orientation="vertical"
        primary="end"
        position-in-pixels="${this.drawerSplit}"
        @wa-reposition="${this.handleDrawerSplitChange}"
      >
        <div slot="start">${this.sidebar ? this.renderPreviewWithSidebar() : html`<slot></slot>`}</div>
        <lb-icon
          name="grip-horizontal"
          slot="divider"
        ></lb-icon>
        <lb-panels
          id="drawer-panels"
          persist-as="inspector.drawer.panels"
          class="pane"
          slot="end"
        >
          <lb-button-group slot="action">
            <lb-button
              id="close-this-drawer"
              @click="${() => this.togglePanel("drawer")}"
            >
              <lb-icon name="x"></lb-icon>
              <lb-tooltip>Hide drawer</lb-tooltip>
            </lb-button>
          </lb-button-group>
          <slot name="drawer"></slot>
        </lb-panels>
      </wa-split-panel>
    `;
  }

  protected renderPanels() {
    if (this.drawer) {
      return this.renderPreviewWithDrawer();
    } else if (this.sidebar) {
      return this.renderPreviewWithSidebar();
    } else {
      return html`<slot></slot>`;
    }
  }

  protected renderLayoutToggles() {
    const viewportToggle =
      this.drawer || this.sidebar
        ? html`
            <lb-button
              id="maximise-viewport"
              @click="${this.toggleMaximizedViewport}"
            >
              <lb-icon name="maximize"></lb-icon>
              <lb-tooltip>Maximize viewport</lb-tooltip>
            </lb-button>
          `
        : html`
            <lb-button
              id="minimise-viewport"
              @click="${this.toggleMaximizedViewport}"
            >
              <lb-icon name="panels-right-bottom"></lb-icon>
              <lb-tooltip>Show all panels</lb-tooltip>
            </lb-button>
          `;

    const drawerToggle = this.drawer
      ? html`
          <lb-button
            id="close-drawer"
            @click="${() => this.togglePanel("drawer")}"
          >
            <lb-icon name="panel-bottom-close"></lb-icon>
            <lb-tooltip>Hide drawer</lb-tooltip>
          </lb-button>
        `
      : html`
          <lb-button
            id="open-drawer"
            @click="${() => this.togglePanel("drawer")}"
          >
            <lb-icon name="panel-bottom-open"></lb-icon>
            <lb-tooltip>Show drawer</lb-tooltip>
          </lb-button>
        `;

    const sidebarToggle = this.sidebar
      ? html`
          <lb-button
            id="close-sidebar"
            @click="${() => this.togglePanel("sidebar")}"
          >
            <lb-icon name="panel-right-close"></lb-icon>
            <lb-tooltip>Hide sidebar</lb-tooltip>
          </lb-button>
        `
      : html`
          <lb-button
            id="open-sidebar"
            @click="${() => this.togglePanel("sidebar")}"
          >
            <lb-icon name="panel-right-open"></lb-icon>
            <lb-tooltip>Show sidebar</lb-tooltip>
          </lb-button>
        `;

    return [viewportToggle, drawerToggle, sidebarToggle];
  }

  // TODO: Hide drawer/sidebar via CSS rather than re-rendering inspector without those elements
  render() {
    return html`
      <div id="container">
        <lb-toolbar id="toolbar">
          <div
            id="breadcrumb"
            slot="start"
          >
            <slot name="breadcrumb"></slot>
          </div>

          <lb-button-group slot="end">
            <lb-button id="copy-permalink">
              <lb-icon name="link"></lb-icon>
              <lb-tooltip>Copy permalink</lb-tooltip>
            </lb-button>
          </lb-button-group>
          <lb-button-group
            slot="end"
            divider="inline-start"
          >
            ${this.renderLayoutToggles()}
          </lb-button-group>
        </lb-toolbar>
        <div id="panes">${this.renderPanels()}</div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "lb-inspector": LookbookInspector;
  }
}
