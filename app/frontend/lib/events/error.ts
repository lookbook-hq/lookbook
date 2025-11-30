/**
 * `lb-error` event
 *
 * Emitted by some components when an error is detected.
 */
export class LookbookErrorEvent extends Event {
  readonly detail: LookbookErrorEventDetail | object;

  constructor(detail = {}) {
    super("lb-error", { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface LookbookErrorEventDetail {
  error: Error;
  context?: object;
}

declare global {
  interface HTMLElementEventMap {
    "lb-error": LookbookErrorEvent;
  }
}
