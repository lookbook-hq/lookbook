import { LitElement } from "lit";

type Constructor<T> = new (...any: any[]) => T;
export declare class WithInternalsInterface {}

export const WithInternals = <T extends Constructor<LitElement>>(superClass: T) => {
  class ElementWithInternals extends superClass {
    static formAssociated = false;

    protected internals: ElementInternals | any;

    constructor(...args: any[]) {
      super(...args);
      this.internals = this.attachInternals();
    }

    public customStates = {
      set: (customState: string, active: boolean) => {
        try {
          this.internals.states[active ? "add" : "delete"](customState);
        } catch {
          this.internals.states[active ? "add" : "delete"](`--${customState}`);
        }
      },

      has: (customState: string) => {
        try {
          return this.internals.states.has(customState);
        } catch {
          return this.internals.states.has(`--${customState}`);
        }
      },
    };
  }

  return ElementWithInternals as Constructor<WithInternalsInterface> & T;
};
