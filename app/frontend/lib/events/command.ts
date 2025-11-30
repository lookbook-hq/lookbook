import { LookbookEvent } from "./event.js";

/**
 * `lb-command` event
 *
 * Generic command event.
 */
export class LookbookCommandEvent extends LookbookEvent {
  readonly command: string;
  readonly detail: LookbookCommandEventDetail;

  constructor(command: string, detail = {}) {
    super("lb-command", { bubbles: true, cancelable: false, composed: true });
    this.command = command;
    this.detail = detail;
  }
}

export interface LookbookCommandEventDetail {
  url?: string;
}

declare global {
  interface HTMLElementEventMap {
    "lb-command": LookbookCommandEvent;
  }
}
