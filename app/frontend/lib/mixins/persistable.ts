import { compact } from "es-toolkit";
import { defaultsDeep, get as getProperty, isEmpty, set as setProperty } from "es-toolkit/compat";
import { LitElement, PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";

type Constructor<T> = new (...args: any[]) => T;

export declare class PersistableInterface {
  persistanceKey?: string;
}

export class PersistanceStore {
  protected store: string;
  protected namespace: string;

  constructor(name: string, defaults = {}) {
    const keys: string[] = name.split(".");
    this.store = compact(["lb", keys.shift()]).join("-");
    this.namespace = keys.join(".");
    this.setPersistedData(defaultsDeep({}, this.getPersistedData(), defaults));
  }

  namespacedPath(path) {
    return `${this.namespace}.${path}`;
  }

  get(path: string, fallback = null) {
    return getProperty(this.getPersistedData(), this.namespacedPath(path), fallback);
  }

  set(path: string, value: any) {
    const data = this.getPersistedData();
    setProperty(data, this.namespacedPath(path), value);
    return this.setPersistedData(data);
  }

  private getPersistedData() {
    return JSON.parse(localStorage.getItem(this.store) || "{}");
  }

  private setPersistedData(data: any) {
    localStorage.setItem(this.store, JSON.stringify(data));
    return this;
  }
}

export const Persistable = <T extends Constructor<LitElement>>(superClass: T) => {
  class PersistableElement extends superClass {
    static persist = [];

    @property({ attribute: "persist-as" }) persistAs: string;
    @state() private persistanceStore: PersistanceStore;

    connectedCallback(): void {
      super.connectedCallback();

      if (isEmpty(this.persistAs)) {
        console.warn("Cannot persist data - missing `persist-as` attribute", this);
        return;
      }

      this.persistanceStore = new PersistanceStore(this.persistAs);

      const constructor = this.constructor as typeof PersistableElement;
      const self = <Record<string | number | symbol, unknown>>this;
      constructor.persist.forEach((key) => {
        self[key] = this.persistanceStore.get(key, this[key]);
      });
    }

    willUpdate(changedProperties: PropertyValues): void {
      super.willUpdate?.(changedProperties);

      if (this.persistanceStore) {
        const constructor = this.constructor as typeof PersistableElement;
        constructor.persist.forEach((key) => {
          if (changedProperties.get(key) !== undefined) {
            this.persistanceStore.set(key, this[key]);
          }
        });
      }
    }

    afterMorph() {
      if (this.persistanceStore) {
        const constructor = this.constructor as typeof PersistableElement;
        const self = <Record<string | number | symbol, unknown>>this;
        constructor.persist.forEach((key) => {
          self[key] = this.persistanceStore.get(key, this[key]);
        });
      }
    }
  }
  return PersistableElement as Constructor<PersistableInterface> & T;
};
