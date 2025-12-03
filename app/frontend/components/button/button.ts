import { LookbookElement } from "@lib/element.js";
import { customElement, nothing, property, PropertyValues, queryAssignedElements, state } from "@lib/lit.js";
import { WithObservableSlots } from "@mixins";
import { html, literal } from "lit/static-html.js";

import { randomId } from "@lib/utils.js";
import styles from "./button.css?text";

/**
 * <lb-button>
 *
 * @summary Multi-purpose button component. Can be for actions, links and tabs.
 */
@customElement("lb-button")
export class LookbookButton extends WithObservableSlots(LookbookElement) {
  static shadowRootOptions = { ...LookbookElement.shadowRootOptions, delegatesFocus: true };
  static css = styles;

  @property() href: string;
  @property() label: string;

  @property() type: "button" | "submit" | "reset" = "button";
  @property() target: "_blank" | "_parent" | "_self" | "_top" | undefined;
  @property({ reflect: true }) appearance: "text" | "button" | "menu-item" = "button";
  @property({ reflect: true }) role: "button" | "tab" = "button";

  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) active = false;

  @property({ attribute: "popover-placement" }) popoverPlacement: string = "bottom-end";

  // TODO: handle command events dispatching properly (make compatible with panel tabs)
  @property({ attribute: "commandfor", type: String, reflect: true }) commandFor: string;
  @property({ attribute: "command", type: String }) command: string;

  // @queryAssignedElements({slot: "tooltip"})

  @state()
  public get commandForTarget(): Element | LookbookElement | null | undefined {
    return this.commandFor ? this.shadowRoot.getElementById(this.commandFor) : undefined;
  }

  @state()
  get isLink() {
    return typeof this.href === "string";
  }

  firstUpdated() {
    this.id = this.id || randomId();
  }

  protected handlePopoverShow(event: Event) {
    this.active = true;
    this.dispatch("lb-popover-open", { popover: event.target });
  }

  protected handlePopoverHide(event: Event) {
    this.dispatch("lb-popover-close", { popover: event.target });
    this.active = false;
  }

  protected renderPopover() {
    return html`
      <wa-popover
        for="button"
        placement="${this.popoverPlacement}"
        distance="0"
        skidding="10"
        @wa-show="${this.handlePopoverShow}"
        @wa-hide="${this.handlePopoverHide}"
      >
        <div id="popover-content">
          <slot name="popover"></slot>
        </div>
      </wa-popover>
    `;
  }

  protected handleTooltipChange(event: Event) {
    const tooltip = event.target?.assignedElements()?.[0];
    if (tooltip) {
      tooltip.for = this.id;
    }
  }

  protected handleClick(event: PointerEvent) {
    if (!this.isLink) return;

    this.dispatch("lb-command", "visit", { url: this.href });
    event.preventDefault();
  }

  render() {
    const tag = this.isLink ? literal`a` : literal`button`;

    return html`
      <${tag}
        id="button"
        part="button"
        type="${this.isLink ? nothing : this.type}"
        href="${this.isLink && !this.disabled ? this.href : nothing}"
        target="${this.isLink ? this.target : nothing}"
        aria-label="${this.label || this.tooltip || nothing}"
        ?disabled="${this.isLink ? nothing : this.disabled}"
        @click="${this.handleClick}"
      >
        <slot id="start" name="start"></slot>
        <slot id="label" part="label"></slot>
        <slot id="end" name="end"></slot>
      </${tag}>



      ${this.whenSlotted("popover", this.renderPopover())}
      <slot name="tooltip" @slotchange="${this.handleTooltipChange}"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "lb-button": LookbookButton;
  }
}
