import Alpine from "alpinejs";
import morph from "@alpinejs/morph";
import persist from "@alpinejs/persist";
import * as components from "../../../app/components/lookbook/ui/**/*.js";

function registerComponents(entries) {
  for (const key in entries) {
    const entry = entries[key];
    if (entry.__esModule === true && "default" in entry) {
      Alpine.data(
        entry.default.componentName || entry.default.name,
        entry.default
      );
    } else {
      registerComponents(entry);
    }
  }
}

function getData(el) {
  const root = Alpine.closestRoot(el);
  return root ? Alpine.$data(root) : null;
}

window.Alpine = Alpine;

export default function initAlpine({ router, logger }) {
  Alpine.plugin(morph);
  Alpine.plugin(persist);

  Alpine.magic("logger", () => logger);
  Alpine.magic("router", () => router);

  registerComponents(components);

  Alpine.start();
}

export { getData };
