/**
 * `lb-display-mode` event
 *
 * Emitted when the display mode changes from light to dark or vice-versa.
 */
export class LookbookDisplayModeChangeEvent extends Event {
  readonly detail: LookbookDisplayModeChangeEventDetail;

  constructor(detail = {}) {
    super("lb-display-mode-change", { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface LookbookDisplayModeChangeEventDetail {}

declare global {
  interface HTMLElementEventMap {
    "lb-display-mode-change": LookbookDisplayModeChangeEvent;
  }
}
