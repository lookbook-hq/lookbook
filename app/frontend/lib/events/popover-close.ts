/**
 * `lb-popover-close` event
 *
 * Emitted when a button dropdown is closed.
 */
export class LookbookPopoverCloseEvent extends Event {
  readonly detail?: LookbookPopoverCloseEventDetail;

  constructor(detail?: LookbookPopoverCloseEventDetail) {
    super("lb-popover-close", { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface LookbookPopoverCloseEventDetail {}

declare global {
  interface GlobalEventHandlersEventMap {
    "lb-popover-close": LookbookPopoverCloseEvent;
  }
}
