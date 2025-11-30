import { Idiomorph } from "idiomorph";
import { LookbookElement } from "./element.js";

export function morph(from: HTMLElement, to: HTMLElement, opts = {}) {
  Idiomorph.morph(from, to, {
    ...opts,
    callbacks: {
      beforeNodeMorphed: (from: HTMLElement, to: HTMLElement) => {
        if (!from?.tagName) return false;

        if (from?.tagName?.startsWith("WA-")) {
          [...to.attributes, ...from.attributes].forEach((attr) => {
            to.setAttribute(attr.name, attr.value);
          });
        }

        if (from instanceof LookbookElement && from.morphable === false) {
          from.replaceWith(to);
          return false;
        }

        return true;
      },

      afterNodeMorphed(node: any) {
        if (node instanceof LookbookElement) {
          node.afterMorph();
        }
      },
    },
  });

  document.dispatchEvent(new CustomEvent("lb-morph-complete", {}));
}
