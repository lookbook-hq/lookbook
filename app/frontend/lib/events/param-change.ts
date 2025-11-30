/**
 * `lb-param-change` event
 *
 * Emitted by controls when a param value is updated.
 */
export class LookbookParamChangeEvent extends Event {
  readonly detail: LookbookParamChangeEventDetail;

  constructor(detail = {}) {
    super("lb-param-change", { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface LookbookParamChangeEventDetail {}

declare global {
  interface HTMLElementEventMap {
    "lb-param-change": LookbookParamChangeEvent;
  }
}
