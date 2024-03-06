import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path.js";
import { registerIconLibrary } from "@shoelace-style/shoelace/dist/utilities/icon-library.js";

export default function initShoelace() {
  if (process.env.NODE_ENV !== "production") {
    setBasePath("/lookbook-dev/shoelace");
  } else {
    setBasePath("/lookbook-assets/shoelace");
  }

  registerIconLibrary("default", {
    resolver: (name) =>
      `https://cdn.jsdelivr.net/npm/lucide-static@0.344.0/icons/${name}.svg`,
  });
}
