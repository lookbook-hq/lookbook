/**
 * `lb-data` event
 *
 * Emitted by `lb-data` elements when the source data changes.
 */
export class LookbookDataEvent extends Event {
  readonly detail: LookbookDataEventDetail;

  constructor(detail = { value: undefined, oldValue: undefined }) {
    super("lb-data", { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface LookbookDataEventDetail {
  value: any;
  oldValue: any;
}

declare global {
  interface HTMLElementEventMap {
    "lb-data": LookbookDataEvent;
  }
}
