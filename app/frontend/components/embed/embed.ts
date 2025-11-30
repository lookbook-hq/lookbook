import { LookbookElement } from "@lib/element.js";
import { customElement, html, property, PropertyValues, query, styleMap } from "@lib/lit.js";
import { handleMessage } from "@lib/postmessage.js";

import { hashDigest } from "@lib/utils.js";
import { Persistable } from "@mixins";
import styles from "./embed.css?text";

/**
 * <lb-embed>
 *
 * @summary embed component.
 */
@customElement("lb-embed")
export class LookbookEmbed extends Persistable(LookbookElement) {
  static css = styles;
  static persist = ["height"];

  @property() spec: string;
  @property() scenario: string;
  @property({ attribute: false }) height = 100;

  @query("#viewport") viewport: HTMLObjectElement;

  async connectedCallback(): Promise<void> {
    this.persistAs = `embed.${await hashDigest(this.spec)}`;

    const messageHandler = this.handleMessage.bind(this);
    window.addEventListener("message", messageHandler);
    this.addCleanupJob(() => window.removeEventListener("message", messageHandler));

    super.connectedCallback();
  }

  protected handleMessage(event: MessageEvent) {
    handleMessage(event, "lb-height-change", ({ height, source }) => {
      if (this.viewport.contentWindow?.location.href === source) {
        this.height = height;
      }
    });
    event.stopPropagation();
  }

  render() {
    const iframeStyles = styleMap({
      height: `${this.height}px`,
    });
    return html`
      <iframe
        id="viewport"
        type="text/html"
        src="/lookbook/embeds/${this.spec.replace("/", ".")}/${this.scenario}"
        title="Lookbook embed"
        style="${iframeStyles}"
      ></iframe>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "lb-embed": LookbookEmbed;
  }
}
