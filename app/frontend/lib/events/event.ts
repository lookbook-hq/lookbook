/**
 * `lb-drag-end` event
 *
 * Emitted by the app component when a drag ends (pointerdown + pointermove) .
 */
export class LookbookEvent extends Event {
  readonly detail?: LookbookEventDetail;

  constructor(type, detail?: LookbookEventDetail) {
    super(type, { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface LookbookEventDetail {}

declare global {
  interface GlobalEventHandlersEventMap {
    "lb-drag-end": LookbookDragEndEvent;
  }
}
