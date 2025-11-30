import { LookbookCommandEvent } from "./command.js";
import { LookbookDataEvent } from "./data.js";
import { LookbookDisplayModeChangeEvent } from "./display-mode-change.js";
import { LookbookDragEndEvent } from "./drag-end.js";
import { LookbookDragStartEvent } from "./drag-start.js";
import { LookbookErrorEvent } from "./error.js";
import { LookbookParamChangeEvent } from "./param-change.js";
import { LookbookPopoverCloseEvent } from "./popover-close.js";
import { LookbookPopoverOpenEvent } from "./popover-open.js";
import { LookbookResizeEvent } from "./resize.js";

export * from "./command.js";
export * from "./data.js";
export * from "./display-mode-change.js";
export * from "./drag-end.js";
export * from "./drag-start.js";
export * from "./error.js";
export * from "./param-change.js";
export * from "./popover-close.js";
export * from "./popover-open.js";
export * from "./resize.js";

export default {
  "lb-command": LookbookCommandEvent,
  "lb-data": LookbookDataEvent,
  "lb-drag-start": LookbookDragStartEvent,
  "lb-drag-end": LookbookDragEndEvent,
  "lb-error": LookbookErrorEvent,
  "lb-resize": LookbookResizeEvent,
  "lb-popover-open": LookbookPopoverOpenEvent,
  "lb-popover-close": LookbookPopoverCloseEvent,
  "lb-param-change": LookbookParamChangeEvent,
  "lb-display-mode-change": LookbookDisplayModeChangeEvent,
};
