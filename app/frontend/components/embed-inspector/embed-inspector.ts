import "@awesome.me/webawesome/dist/components/resize-observer/resize-observer.js";
import { LookbookPanel } from "@components";
import { LookbookElement } from "@lib/element.js";
import { customElement, html, property, query, queryAssignedElements, state } from "@lib/lit.js";
import { dispatchMessage } from "@lib/postmessage.js";
import { isFramed } from "@lib/utils.js";

import styles from "./embed-inspector.css?text";

/**
 * <lb-embed-inspector>
 *
 * @summary Inspector component for use in embeds.
 */
@customElement("lb-embed-inspector")
export class LookbookEmbedInspector extends LookbookElement {
  static css = styles;

  @property({ attribute: "persist-as" }) persistAs: string;
  @property({ reflect: true }) src: string;

  @state() hasPanels = false;

  @query("#panels > slot") panelSlot: HTMLSlotElement;
  @queryAssignedElements({ selector: "lb-viewport" }) viewportElements;

  @state()
  protected get viewport() {
    return this.viewportElements?.[0];
  }

  protected handlePanelSlotChange() {
    let panels = this.panelSlot?.assignedElements({ flatten: true }) as LookbookPanel[];
    panels = panels ? panels.filter((panel) => panel.localName === "lb-panel") : [];
    this.hasPanels = panels.length > 0;
  }

  protected handleHeightChange(event) {
    if (isFramed()) {
      const { contentRect } = event.detail.entries[0];
      const height = Math.max(Math.round(contentRect.height), this.offsetHeight);
      dispatchMessage("lb-height-change", { data: { height } });
    }
  }

  protected render() {
    return html`
      <wa-resize-observer @wa-resize="${this.handleHeightChange}">
        <div id="preview">
          <slot></slot>
        </div>
        <lb-panels
          id="panels"
          persist-as="${this.persistAs}"
          divider="block-start"
          ?hidden="${!this.hasPanels}"
        >
          <lb-button-group slot="action"></lb-button-group>
          <slot
            name="panel"
            @slotchange="${this.handlePanelSlotChange}"
          ></slot>
        </lb-panels>
      </wa-resize-observer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "lb-embed-inspector": LookbookEmbedInspector;
  }
}
