import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path.js";
import { registerIconLibrary } from "@shoelace-style/shoelace/dist/utilities/icon-library.js";

export default function initShoelace() {
  setBasePath("/lookbook-assets/shoelace");

  registerIconLibrary("default", {
    resolver: (name) =>
      `https://cdn.jsdelivr.net/npm/lucide-static@0.360.0/icons/${name}.svg`,
  });
}
