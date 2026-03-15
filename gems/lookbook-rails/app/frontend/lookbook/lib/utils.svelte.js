import { getContext } from "svelte";

export function getCurrentContext() {
  return getContext("current")();
}

export function toAbsoluteSize(relativeSize, maxSize) {
  return (relativeSize / 100) * maxSize;
}

export function toRelativeSize(absoluteSize, maxSize) {
  return (absoluteSize / maxSize) * 100;
}
