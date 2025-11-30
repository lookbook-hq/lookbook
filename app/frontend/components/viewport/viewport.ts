import "@awesome.me/webawesome/dist/components/resize-observer/resize-observer.js";

import type { LookbookToolbar } from "@components";
import { LookbookElement } from "@lib/element.js";
import { customElement, html, nothing, property, query, queryAll, state, styleMap } from "@lib/lit.js";
import { addMessageListener, handleMessage } from "@lib/postmessage.js";
import { Persistable } from "@mixins";

import styles from "./viewport.css?text";

const HANDLE_SIZE = 16;
const SIZE_FILL = 1000000;

/**
 * <lb-viewport>
 *
 * @summary Resizeable preview window.
 */
@customElement("lb-viewport")
export class LookbookViewport extends Persistable(LookbookElement) {
  static css = styles;
  static persist = ["width", "height", "lastWidth", "lastHeight", "resize", "activeMode"];

  @query("#iframe") iframe: HTMLIFrameElement;
  @query("#window") window: HTMLElement;
  @query("#resizer") resizer: HTMLElement;
  @query("#toolbar") toolbarEl: LookbookToolbar;

  @queryAll(".handle") handles: Array<HTMLElement>;

  @property() src: string;
  @property() srcdoc: string;
  @property() description: string;
  @property({ type: Boolean }) toolbar = false;

  @property() mode: "responsive" | "fixed" | "toggle" = "toggle";
  @property({ attribute: "activemode", reflect: true }) activeMode: string;
  @property({ reflect: true, type: String }) resize: "horizontal" | "vertical" | "both" | "none" = "both";

  @state() width: number = SIZE_FILL;
  @state() height: number = SIZE_FILL;
  @state() minWidth: number = 100;
  @state() minHeight: number = 100;
  @state() maxWidth: number;
  @state() maxHeight: number;
  @state() lastWidth: number;
  @state() lastHeight: number;
  @state() displayWidth: number;
  @state() displayHeight: number;

  @state() resizeData: ResizeData | null = null;
  @state() containerSizeObserver: ResizeObserver | null = null;
  @state() viewportSizeObserver: ResizeObserver | null = null;

  @state()
  get responsive() {
    return this.activeMode === "responsive" && this.resize !== "none";
  }

  @state()
  get horizontallyResizable() {
    return ["horizontal", "both"].includes(this.resize);
  }

  @state()
  get verticallyResizable() {
    return ["vertical", "both"].includes(this.resize);
  }

  @state()
  get resizable() {
    return this.activeMode === "responsive" && (this.verticallyResizable || this.horizontallyResizable);
  }

  @state()
  get resizing() {
    return this.resizeData !== null;
  }

  @state()
  get expandable() {
    return this.width < this.maxWidth || this.height < this.maxHeight;
  }

  constructor() {
    super();
    this.handleResize = this.handleResize.bind(this);
    this.stopResize = this.stopResize.bind(this);
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.activeMode = this.activeMode || (["responsive", "toggle"].includes(this.mode) ? "responsive" : "fixed");
    this.width = this.width || SIZE_FILL;
    this.height = this.height || SIZE_FILL;

    const messageHandler = this.handleMessage.bind(this);
    window.addEventListener("message", messageHandler);
    this.addCleanupJob(() => window.removeEventListener("message", messageHandler));

    this.delegate("lb-drag-start", () => {
      this.iframe.inert = true;
    });

    this.delegate("lb-drag-end", () => {
      // TODO: fix issue with iframe scrolling after resize
      this.iframe.inert = false;
    });
  }

  public expandToFullSize() {
    this.width = SIZE_FILL;
    this.height = SIZE_FILL;
  }

  public reload() {
    this.contentWindow?.location.reload();
  }

  public setFixedHeight(height: number) {
    this.style.height = `${height + (this.toolbar?.offsetHeight || 0)}px`;
    this.height = this.maxHeight = height;
  }

  public get contentWindow() {
    return this.iframe?.contentWindow;
  }

  protected startResize(event: PointerEvent) {
    if (!this.responsive || this.resizing) return;

    const handle = event.target;

    this.resizeData = {
      startX: event.clientX,
      startY: event.clientY,
      startWidth: this.resizer.offsetWidth,
      startHeight: this.resizer.offsetHeight,
      handle,
    };

    document.addEventListener("pointermove", this.handleResize);
    document.addEventListener("pointerup", this.stopResize);

    handle.setPointerCapture(event.pointerId);
    event.preventDefault();
  }

  protected handleResize(event: PointerEvent) {
    if (!this.resizing || !this.resizeData) return;

    const { startWidth, startHeight, startY, startX, handle } = this.resizeData<resizeData>;
    const axis = handle.getAttribute("axis") || "xy";

    if (axis.includes("x")) {
      const width = Math.round(startWidth + (event.clientX - startX) * 2);
      const boundedWidth = Math.max(Math.min(width, this.maxWidth), this.minWidth);
      this.width = boundedWidth >= this.maxWidth ? SIZE_FILL : boundedWidth;
    }

    if (axis.includes("y")) {
      const height = Math.round(startHeight + (event.clientY - startY));
      const boundedHeight = Math.max(Math.min(height, this.maxHeight), this.minHeight);
      this.height = boundedHeight >= this.maxHeight ? SIZE_FILL : boundedHeight;
    }
  }

  protected stopResize(event: PointerEvent) {
    if (!this.resizing) return;

    const { handle } = this.resizeData;
    this.resizeData = null;

    document.removeEventListener("pointermove", this.handleResize);
    document.removeEventListener("pointerup", this.stopResize);
    handle.releasePointerCapture(event.pointerId);
  }

  protected toggleFullWidth() {
    if (this.width === SIZE_FILL) {
      this.width = this.lastWidth;
    } else {
      this.lastWidth = this.width;
      this.width = SIZE_FILL;
    }
  }

  protected toggleFullHeight() {
    if (this.height === SIZE_FILL) {
      this.height = this.lastHeight;
    } else {
      this.lastHeight = this.height;
      this.height = SIZE_FILL;
    }
  }

  protected toggleFullSize() {
    this.toggleFullWidth();
    this.toggleFullHeight();
  }

  protected toggleActiveMode() {
    this.activeMode = this.activeMode === "responsive" ? "fixed" : "responsive";
  }

  protected handleContainerSizeChange(event: CustomEvent) {
    const contentRect = event.detail.entries[0].contentRect;
    this.maxWidth = Math.round(contentRect.width);
    this.maxHeight = Math.round(contentRect.height);

    event.stopPropagation();
  }

  protected handleViewportSizeChange(event: CustomEvent) {
    const contentRect = event.detail.entries[0].contentRect;
    this.displayWidth = Math.round(contentRect.width);
    this.displayHeight = Math.round(contentRect.height);

    event.stopPropagation();
  }

  protected handleMessage(event: MessageEvent) {
    if (!this.verticallyResizable) {
      handleMessage(event, "lb-height-change", (data) => {
        const { source, height } = data;
        if (this.iframe.contentWindow?.location.href === source) {
          this.setFixedHeight(height);
        }
      });
      event.stopPropagation();
    }
  }

  protected renderDimensions() {
    return html`
      <div
        id="viewport-dimensions"
        slot="start"
      >
        <output
          class="dimension"
          name="viewport-width"
        >
          ${this.displayWidth}
          <abbr>px</abbr>
        </output>
        <span class="times">&times;</span>
        <output
          class="dimension"
          name="viewport-height"
        >
          <span>${this.displayHeight}</span>
          <abbr>px</abbr>
        </output>
      </div>
    `;
  }

  protected renderDragHandles() {
    return html`
      <div
        id="x-handle"
        class="handle"
        axis="x"
        @pointerdown="${this.startResize}"
        @dblclick="${this.toggleFullWidth}"
        ?hidden="${!this.horizontallyResizable}"
      >
        <lb-icon name="grip-vertical"></lb-icon>
      </div>
      <div
        id="y-handle"
        class="handle"
        axis="y"
        @pointerdown="${this.startResize}"
        @dblclick="${this.toggleFullHeight}"
        ?hidden="${!this.verticallyResizable}"
      >
        <lb-icon name="grip-horizontal"></lb-icon>
      </div>
      <div
        id="xy-handle"
        class="handle"
        @pointerdown="${this.startResize}"
        @dblclick="${this.toggleFullSize}"
        ?hidden="${!(this.horizontallyResizable && this.verticallyResizable)}"
      >
        <lb-icon name="grip-horizontal"></lb-icon>
      </div>
    `;
  }

  protected renderToolbar() {
    return html`
      <lb-toolbar
        id="toolbar"
        divider="block-end"
      >
        <lb-button-group slot="start">
          ${this.mode === "toggle"
            ? html`
                <lb-button
                  id="toggle-responsive-mode"
                  @click="${this.toggleActiveMode}"
                  ?active=${this.responsive}
                >
                  <lb-icon name="tablet-smartphone"></lb-icon>
                  <lb-tooltip>${"Toggle device mode"}</lb-tooltip>
                </lb-button>
              `
            : nothing}
        </lb-button-group>
        ${this.renderDimensions()}

        <lb-button-group slot="end">
          <lb-button
            id="reload-preview"
            @click="${this.reload}"
          >
            <lb-icon name="refresh-cw"></lb-icon>
            <lb-tooltip placement="top">Refresh preview</lb-tooltip>
          </lb-button>

          <lb-button
            id="open-in-new-window"
            href="${this.src}"
            target="_blank"
          >
            <lb-icon name="square-arrow-out-up-right"></lb-icon>
            <lb-tooltip placement="top">Open in new window</lb-tooltip>
          </lb-button>
        </lb-button-group>
      </lb-toolbar>
    `;
  }

  render() {
    const resizerStyles = {
      width: !this.responsive || this.width >= this.maxWidth ? `100%` : `${this.width - HANDLE_SIZE}px`,
      height: !this.responsive || this.height >= this.maxHeight ? `100%` : `${this.height - HANDLE_SIZE}px`,
    };

    return html`
      <div id="viewer">
        ${this.toolbar ? this.renderToolbar() : nothing}
        <wa-resize-observer @wa-resize="${this.handleContainerSizeChange}">
          <div id="window">
            <div
              id="resizer"
              style="${styleMap(resizerStyles)}"
            >
              <wa-resize-observer @wa-resize="${this.handleViewportSizeChange}">
                <iframe
                  id="iframe"
                  type="text/html"
                  src="${this.src}"
                  title="${this.description}"
                ></iframe>
              </wa-resize-observer>
              ${this.responsive ? this.renderDragHandles() : nothing}
            </div>
          </div>
        </wa-resize-observer>
      </div>
    `;
  }
}

interface ResizeData {
  startX: number;
  startY: number;
  startWidth: number;
  startHeight: number;
  handle: HTMLElement;
}

declare global {
  interface HTMLElementTagNameMap {
    "lb-viewport": LookbookViewport;
  }
}
