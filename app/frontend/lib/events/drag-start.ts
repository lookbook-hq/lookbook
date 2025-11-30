/**
 * `lb-drag-start` event
 *
 * Emitted by the app component when a drag starts (pointerdown + pointermove) .
 */
export class LookbookDragStartEvent extends Event {
  readonly detail?: LookbookDragStartEventDetail;

  constructor(detail?: LookbookDragStartEventDetail) {
    super("lb-drag-start", { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface LookbookDragStartEventDetail {}

declare global {
  interface GlobalEventHandlersEventMap {
    "lb-drag-start": LookbookDragStartEvent;
  }
}
