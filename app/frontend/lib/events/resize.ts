/**
 * `lb-resize` event
 *
 * Emitted when an observed element is resized.
 */
export class LookbookResizeEvent extends Event {
  readonly detail?: LookbookResizeEventDetail;

  constructor(detail?: LookbookResizeEventDetail) {
    super("lb-resize", { bubbles: false, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface LookbookResizeEventDetail {
  entry?: ResizeObserverEntry;
}

declare global {
  interface GlobalEventHandlersEventMap {
    "lb-resize": LookbookResizeEvent;
  }
}
