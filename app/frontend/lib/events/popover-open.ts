/**
 * `lb-popover-open` event
 *
 * Emitted when a button dropdown is opened.
 */
export class LookbookPopoverOpenEvent extends Event {
  readonly detail?: LookbookPopoverOpenEventDetail;

  constructor(detail?: LookbookPopoverOpenEventDetail) {
    super("lb-popover-open", { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface LookbookPopoverOpenEventDetail {}

declare global {
  interface GlobalEventHandlersEventMap {
    "lb-popover-open": LookbookPopoverOpenEvent;
  }
}
