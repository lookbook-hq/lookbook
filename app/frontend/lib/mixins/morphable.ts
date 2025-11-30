import { LitElement, PropertyValues } from "lit";
import { state } from "lit/decorators.js";

type Constructor<T> = new (...args: any[]) => T;
export declare class MorphableInterface {}

/*
 * Makes LitElements play nicer when being morphed via Idiomorph.
 * Adapted from: https://www.konnorrogers.com/posts/2024/making-lit-components-morphable
 */
export const Morphable = <T extends Constructor<LitElement>>(superClass: T) => {
  class MorphableElement extends superClass {
    #hasRecordedInitialProperties = false;

    @state() initialReflectedProperties: Map<string, any> = new Map();

    attributeChangedCallback(name, oldValue, newValue) {
      if (!this.#hasRecordedInitialProperties) {
        const self = <Record<string | number | symbol, unknown>>this;
        this.constructor.elementProperties.forEach((obj, prop) => {
          if (obj.reflect && self[prop] != null) {
            this.initialReflectedProperties.set(prop, self[prop]);
          }
        });

        this.initialReflectedProperties.set("slot", this.slot);
        this.#hasRecordedInitialProperties = true;
      }

      super.attributeChangedCallback?.(name, oldValue, newValue);
    }

    protected willUpdate(changedProperties: PropertyValues): void {
      super.willUpdate?.(changedProperties);

      const self = <Record<string | number | symbol, unknown>>this;
      this.initialReflectedProperties.forEach((value, prop) => {
        if (changedProperties.has(prop) && self[prop] == null) {
          self[prop] = value;
        }
      });
    }
  }

  return MorphableElement as Constructor<MorphableInterface> & T;
};
