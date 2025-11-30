import { LookbookElement } from "@lib/element.js";
import { customElement, html, property, PropertyValues, state } from "@lib/lit.js";
import { hasChanged, parseData, randomId } from "@lib/utils.js";
import stripIndent from "strip-indent";

import styles from "./data.css?text";

/**
 * <lb-data>
 *
 * @summary Component to handle loading/parsing of data.
 */
@customElement("lb-data")
export class LookbookData extends LookbookElement {
  static morphable = false;
  static css = styles;

  @property() format: string = "json";

  @state({ hasChanged }) rawData: string = "";
  @state({ hasChanged }) value: any;

  protected handleSlotChange() {
    this.rawData = stripIndent(this.textContent);
  }

  protected willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has("rawData") && this.rawData) {
      try {
        this.value = parseData(this.rawData, this.format);
      } catch (error) {
        this.warn(<Error>error);
      }
    }

    if (changedProperties.has("value")) {
      this.dispatch("lb-data", { value: this.value, oldValue: changedProperties.get("value") });
    }
  }

  render() {
    return html`
      <slot
        @slotchange="${() => this.handleSlotChange()}"
        hidden
      ></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "lb-data": LookbookData;
  }
}
