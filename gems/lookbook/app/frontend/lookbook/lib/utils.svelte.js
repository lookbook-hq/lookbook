import { resource } from "runed";
import { getContext } from "svelte";

export function getCurrentContext() {
  return getContext("current")();
}
