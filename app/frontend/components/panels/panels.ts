import type { LookbookButton, LookbookPanel } from "@components";
import "@components/toolbar/toolbar.js";
import { LookbookElement } from "@lib/element.js";
import { customElement, html, property, PropertyValues, query, state, TemplateResult } from "@lib/lit.js";
import { Persistable } from "@mixins";
import { isString } from "es-toolkit";

import styles from "./panels.css?text";

/**
 * <lb-panels>
 *
 * @summary Lookbook panel group.
 */
@customElement("lb-panels")
export class LookbookPanels extends Persistable(LookbookElement) {
  static css = styles;
  static persist = ["panel"];

  @property({ reflect: true }) panel: string | undefined;
  @property() region: string | undefined;

  @property({ attribute: false, type: Number }) length = 0;

  @state() initialized: boolean = false;

  @query("#panels > slot") panelSlot: HTMLSlotElement;
  @query("#tabs") tabContainer: HTMLElement;

  connectedCallback(): void {
    super.connectedCallback();
    this.persistanceKey = isString(this.region) ? this.region : this.id;

    this.delegate("lb-morph-complete", this.afterMorph.bind(this));
  }

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has("panel")) {
      const panels = this.getPanels();
      this.length = panels.length;
      this.setActivePanel(this.panel || panels[0]?.name);
    }
  }

  afterMorph() {
    this.setActivePanel(this.panel);
  }

  protected getPanels(): LookbookPanel[] {
    const panels = this.panelSlot?.assignedElements({ flatten: true }) as LookbookPanel[];
    return panels ? panels.filter((panel) => panel.localName === "lb-panel") : [];
  }

  protected getTabs(): LookbookButton[] {
    const tabs = <Array<LookbookButton>>Array.from(this.tabContainer.children);
    return tabs ? tabs.filter((tab) => tab.localName === "lb-button") : [];
  }

  protected handleSlotChange() {
    const panels = this.getPanels();

    panels.forEach((panel) => {
      if (!panel.hasAttribute("aria-describedby")) {
        panel.setAttribute("aria-describedby", `${panel.id}-tab`);
      }
    });

    this.renderTabsForPanels(panels);
    this.setActivePanel(this.panel);
  }

  protected renderTabsForPanels(panels: LookbookPanel[]) {
    const tabTemplate = (panel: LookbookPanel): TemplateResult => {
      const id = panel.getAttribute("aria-describedby");
      return html`
        <lb-button
          slot="tab"
          id="${id}"
          role="tab"
          aria-labelledby="${panel.id}"
          @click="${(e) => this.handleTabClick(e)}"
          commandfor="${panel.name}"
          ?active="${panel.name === this.panel}"
        >
          ${panel.label}
        </lb-button>
      `;
    };

    this.renderToTarget(this.tabContainer, panels.map(tabTemplate));
  }

  protected async setActivePanel(name: string | undefined) {
    this.panel = name;

    this.getTabs().forEach((tab) => (tab.active = tab.commandFor === name));
    this.getPanels().forEach((panel) => (panel.visible = panel.name === name));
  }

  protected handleTabClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const tab = <LookbookButton>target.closest("lb-button");
    this.setActivePanel(tab?.commandFor);
  }

  render() {
    return html`
      <lb-toolbar divider="block-end">
        <div
          id="tabs"
          slot="start"
          role="tablist"
        ></div>
        <div slot="end">
          <slot name="action"></slot>
        </div>
      </lb-toolbar>
      <div id="panels">
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "lb-panels": LookbookPanels;
  }
}
