import { LookbookElement } from "@lib/element.js";
import { customElement, html, property, PropertyValues, query } from "@lib/lit.js";
import { pascalCase } from "es-toolkit";
import * as IconSet from "lucide"; // TODO: Only import required subset icons

const { createElement } = IconSet;

import styles from "./icon.css?text";

const LOOKBOOK_ICON_SVG = `
  <svg viewBox="0 0 18 22">
    <g
      stroke="currentColor"
      stroke-width="1.5"
      fill="none"
      fill-rule="evenodd"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M3.5 1H17v20H3.5A2.5 2.5 0 0 1 1 18.5v-15A2.5 2.5 0 0 1 3.5 1Z"></path>

      <path
        d="M1.153 19.36c0-.737.261-1.188.596-1.57.417-.475.985-.79 1.751-.79H17M6.801 5.1v7.554L6.8 12.7h5.57"
      ></path>
    </g>
  </svg>
`;

/**
 * <lb-icon>
 *
 * @summary Icon component. Uses the Lucide icon library: http://lucide.dev/
 */
@customElement("lb-icon")
export class LookbookIcon extends LookbookElement {
  static css = styles;

  @property({ reflect: true }) name: string;
  @property({ attribute: "stroke", type: Number }) strokeWidth: number = 1.75;
  @property({ reflect: true }) size: "sm" | "md" | "lg" | null;
  @property() label: string;

  @query("#icon") iconWrapper: HTMLElement;

  firstUpdated() {
    this.setAttribute("role", "img");
    this.setAttribute("aria-hidden", "true");
  }

  updated(changedProperties: PropertyValues<this>) {
    // Update the icon's role when a label is added or removed
    if (changedProperties.has("label")) {
      if (this.label) {
        this.setAttribute("aria-label", this.label);
        this.removeAttribute("aria-hidden");
      } else {
        this.setAttribute("aria-hidden", "true");
        this.removeAttribute("aria-label");
      }
    }
    if (changedProperties.has("name")) {
      if (this.name === "lookbook") {
        this.iconWrapper.innerHTML = LOOKBOOK_ICON_SVG;
      } else {
        const iconKlass = IconSet[pascalCase(this.name)];
        const icon = createElement(iconKlass, {
          part: "svg",
          "stroke-width": this.strokeWidth,
        });

        if (icon) {
          this.iconWrapper.innerHTML = "";
          this.iconWrapper.appendChild(icon);
        } else {
          console.error(`Missing icon '${this.name}'`);
        }
      }
    }
  }

  render() {
    return html`<i id="icon"></i>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "lb-icon": LookbookIcon;
  }
}
