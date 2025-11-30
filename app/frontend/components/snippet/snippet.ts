import { LookbookElement } from "@lib/element.js";
import { guessLanguage, highlight } from "@lib/highlighter.js";
import { getLinter, LinterInterface, LintResult } from "@lib/linters.js";
import { customElement, html, property, PropertyValues, state, unsafeHTML } from "@lib/lit.js";
import { hasChanged, randomId } from "@lib/utils.js";
import { transformerNotationErrorLevel } from "@shikijs/transformers";
import stripIndent from "strip-indent";

import styles from "./snippet.css?text";

/**
 * <lb-snippet>
 *
 * @summary Syntax-highlighted code block component.
 */
@customElement("lb-snippet")
export class LookbookSnippet extends LookbookElement {
  static css = styles;

  // TODO: use global state store instead of globalThis/window
  // TODO: add support for more/configurable themes
  @property({ type: String }) theme = `github-${globalThis.displayMode || "light"}`;
  @property({ type: String }) lang = "ruby";

  @property({ type: Number, reflect: true }) surface = 1;
  @property({ type: Boolean }) plain = false;
  @property({ type: Boolean }) numbered = false;
  @property({ type: Boolean }) lint = false;

  @state({ hasChanged }) rawCode: string = "";
  @state({ hasChanged }) highlightedCode: string;

  @state() linter: LinterInterface | undefined;
  @state() lintResult: LintResult | Error;

  @state()
  get resolvedLang() {
    if (this.plain) {
      return "text";
    } else {
      return this.lang || guessLanguage(this.rawCode, "text");
    }
  }

  connectedCallback(): void {
    super.connectedCallback();

    if (this.lint) {
      this.linter = getLinter(this.resolvedLang);
    }

    this.delegate("lb-display-mode-change", (event) => {
      this.theme = `github-${event.detail.mode}`;
    });
  }

  public afterMorph(): void {
    this.rawCode = stripIndent(this.textContent).trim();
  }

  protected firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.id = randomId();
  }

  protected handleSlotChange() {
    this.rawCode = stripIndent(this.textContent).trim();
  }

  protected async willUpdate(changedProperties: PropertyValues): Promise<void> {
    if (changedProperties.has("theme") || changedProperties.has("rawCode")) {
      if (this.rawCode && this.linter) {
        try {
          this.lintResult = await this.linter.lint(this.rawCode);
        } catch (error: any) {
          this.lintResult = error;
        }
      }

      if (this.rawCode) {
        this.highlightedCode = highlight(this.rawCode, {
          lang: this.resolvedLang,
          theme: this.theme,
          transformers: [transformerNotationErrorLevel()],
        });
      }
    }

    super.willUpdate(changedProperties);
  }

  render() {
    return html`
      <div id="container">${unsafeHTML(this.highlightedCode)}</div>
      <slot
        @slotchange="${() => this.handleSlotChange()}"
        hidden
      ></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "lb-snippet": LookbookSnippet;
  }
}
