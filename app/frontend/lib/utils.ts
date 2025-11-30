import eventsMap from "@events";
import { isEqual } from "es-toolkit";
import { ComplexAttributeConverter } from "lit";
import { LookbookElement } from "./element.js";

export function randomId(prefix = null) {
  return [prefix, randomCharString()].filter((i) => i).join("-");
}
export function randomCharString() {
  return Math.random()
    .toString(36)
    .replace(/^0\./, "")
    .replace(/^[0-9]+/, "");
}
export function isInternalAnchor(el: HTMLAnchorElement): boolean {
  return !el.hasAttribute("target");
}

export async function allUpdatesComplete(elements: LookbookElement[]) {
  await Promise.all(elements.map((element) => element.updateComplete));
  return elements;
}

export function parseData(dataStr: string, format: string = "json"): any {
  switch (format.toLowerCase()) {
    case "json":
      return JSON.parse(dataStr);
    default:
      throw new Error(`No parser found for '${format}' format data`);
  }
}

export function getEventClassByType(type: string) {
  return eventsMap[type];
}

export function hasChanged(a, b) {
  return !isEqual(a, b);
}

export function arrayConverter(): ComplexAttributeConverter<Array<unknown>> {
  return {
    toAttribute: (array: Array<unknown>) => {
      const arrayString = JSON.stringify(array);
      return JSON.stringify(array).substring(1, JSON.stringify(array).length - 1);
    },
    fromAttribute: (value: string) => {
      try {
        return JSON.parse(`[${value}]`);
      } catch {
        return [];
      }
    },
  };
}

export function arrayRange(start, stop, step = 1) {
  return Array.from({ length: (stop - start) / step + 1 }, (_, index) => start + index * step);
}

export function getBodyHeight() {
  var height,
    margin,
    el = document.body;
  height = parseInt(window.getComputedStyle(el, "").getPropertyValue("height"), 10);
  margin =
    parseInt(window.getComputedStyle(el, "").getPropertyValue("margin-top"), 10) +
    parseInt(window.getComputedStyle(el, "").getPropertyValue("margin-bottom"), 10);
  return height + margin;
}

export async function hashDigest(str) {
  const msgUint8 = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex.slice(0, 7);
}

export function isFramed() {
  return window.location !== window.parent.location;
}
