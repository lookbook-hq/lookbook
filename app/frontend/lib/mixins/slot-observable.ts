import { html, LitElement, nothing, TemplateResult } from "lit";
import { state } from "lit/decorators.js";

type Constructor<T> = new (...args: any[]) => T;
export declare class WithObservableSlotsInterface {}

export const WithObservableSlots = <T extends Constructor<LitElement>>(superClass: T) => {
  class WithObservableSlotsElement extends superClass {
    @state() slotsWithContent: Set<string> = new Set();

    connectedCallback() {
      super.connectedCallback();
      this.updateSlotsWithContent();
      this.shadowRoot?.addEventListener("slotchange", () => {
        this.updateSlotsWithContent();
      });
    }

    private updateSlotsWithContent() {
      const newSlots = new Set([...this.querySelectorAll(":scope > [slot]")].map((el) => el.slot));

      if (JSON.stringify([...newSlots].sort()) !== JSON.stringify([...this.slotsWithContent].sort())) {
        this.slotsWithContent = newSlots;
      }
    }

    protected whenSlotted(
      name: string,
      content: TemplateResult,
      fallback: TemplateResult,
      options?: Partial<WhenSlottedOptions>
    ) {
      const opts: WhenSlottedOptions = {
        force: false,
        ...options,
      };

      return this.slotsWithContent.has(name) || opts.force
        ? content
        : html`
            ${fallback || nothing}
            <slot
              name="${name}"
              hidden
            ></slot>
          `;
    }
  }

  return WithObservableSlotsElement as Constructor<WithObservableSlotsInterface> & T;
};

interface WhenSlottedOptions {
  force: boolean;
}
