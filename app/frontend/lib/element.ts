import { CSSResult, CSSResultGroup, LitElement, TemplateResult, renderTemplate, state, unsafeCSS } from "@lib/lit.js";
import { Morphable } from "@mixins";
import { isNotNil, isPlainObject, isString } from "es-toolkit";
import { getEventClassByType } from "./utils.js";

import hostCSS from "@styles/host.css?text";

/**
 * The base class for all Lookbook components
 */
export class LookbookElement extends Morphable(LitElement) {
  static shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    serializable: true,
  };

  static morphable = true;

  static css?: CSSResultGroup | CSSResult | string | (CSSResult | string)[];

  /**
   * Combines shared base styles with any styles defined in the subclass.
   */
  static get styles(): CSSResultGroup {
    const styles = Array.isArray(this.css) ? this.css : this.css ? [this.css] : [];
    return [hostCSS, ...styles].map((style) => (typeof style === "string" ? unsafeCSS(style) : style));
  }

  @state() cleanupJobs: Array<any> = [];

  public shadowRoot: ShadowRoot;

  constructor() {
    super();
  }

  /*
   * Override this in subclassed elements where some special behaviour
   * is needed to ensure morphs are completed successfully.
   */
  public afterMorph() {}

  public get morphable() {
    return !!this.getStaticProperty("morphable");
  }

  public disconnectedCallback(): void {
    this.cleanupJobs.forEach((job: Function) => job());
    super.disconnectedCallback();
  }

  protected addCleanupJob(job: Function) {
    this.cleanupJobs.push(job);
  }

  protected renderToTarget(target: HTMLElement, template: TemplateResult | TemplateResult[]) {
    renderTemplate(template, target);
  }

  protected on(type: any, listener: (this: HTMLElement, ev: any) => any): void {
    this.addEventListener(type, listener);
    this.addCleanupJob(() => this.removeEventListener(type, listener));
  }

  protected delegate(type: any, listener: (this: HTMLElement, ev: any) => any): void {
    document.addEventListener(type, listener);
    this.addCleanupJob(() => document.removeEventListener(type, listener));
  }

  protected dispatch(type: string, ...args: Array<any>) {
    const eventClass = getEventClassByType(type);
    let target = this;

    if (!eventClass) {
      console.warn(`Unknown event type '${type}'`);
      return;
    }

    let detailObject = null;
    if (isPlainObject(args[0])) {
      detailObject = args[0];
      args = [];
    } else if (args.length > 0 && isPlainObject(args[args.length - 1])) {
      detailObject = args.pop();
    }

    if (detailObject?.target) {
      const targetElement = isString(detailObject.target) ? document.querySelector(`#${detailObject.target}`) : target;
      if (targetElement) target = targetElement;
    }

    const eventArgs = [...args, detailObject].filter(isNotNil);

    target.dispatchEvent(new eventClass(...eventArgs));
  }

  protected getStaticProperty(name: string) {
    const constructor: Record<string, any> = this.constructor as typeof LookbookElement;
    return constructor[name];
  }

  protected warn(error: Error | string) {
    if (isString(error)) error = new Error(error);

    this.dispatch("lb-error", { error });
    console.error(error);
  }
}
