import Alpine from "alpinejs";
import { registerComponents } from "./utils";
import * as components from "../../../app/components/lookbook/ui/public/**/*.js";

window.Alpine = Alpine;

export default function initAlpine({ logger }) {
  Alpine.magic("logger", () => logger);

  registerComponents(components);

  Alpine.start();
}
