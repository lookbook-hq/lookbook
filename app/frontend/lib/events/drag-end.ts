/**
 * `lb-drag-end` event
 *
 * Emitted by the app component when a drag ends (pointerdown + pointermove) .
 */
export class LookbookDragEndEvent extends Event {
  readonly detail?: LookbookDragEndEventDetail;

  constructor(detail?: LookbookDragEndEventDetail) {
    super("lb-drag-end", { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface LookbookDragEndEventDetail {}

declare global {
  interface GlobalEventHandlersEventMap {
    "lb-drag-end": LookbookDragEndEvent;
  }
}
