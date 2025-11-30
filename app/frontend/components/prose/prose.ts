import { LookbookElement } from "@lib/element.js";
import getText from "@lib/get-text.js";
import { customElement, html, property, state, unsafeHTML } from "@lib/lit.js";
import { markdownToHTML } from "@lib/markdown.js";
import stripIndent from "strip-indent";

import sharedProseStyles from "@styles/prose.css?text";
import styles from "./prose.css?text";

/**
 * <lb-prose>
 *
 * @summary Prose component.
 */
@customElement("lb-prose")
export class LookbookProse extends LookbookElement {
  static css = [sharedProseStyles, styles];

  @property({ type: Boolean }) markdown = false;
  @property({ type: Boolean }) condensed = false;

  @state() rawContent: string | null = null;

  @state()
  get output() {
    return this.rawContent ? unsafeHTML(this.markdown ? markdownToHTML(this.rawContent) : this.rawContent) : "";
  }

  protected handleSlotChange(event) {
    this.rawContent = stripIndent(getText(event.target)).trim();
  }

  render() {
    return html`
      <div
        id="content"
        class="lb-prose"
      >
        ${this.output}
      </div>
      <slot
        @slotchange="${this.handleSlotChange}"
        hidden
      ></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "lb-prose": LookbookProse;
  }
}
