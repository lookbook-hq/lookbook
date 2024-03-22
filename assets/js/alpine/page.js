import Alpine from "alpinejs";
import { registerComponents } from "./utils";
import components from "../../../app/components/lookbook/ui/shared/**/*.js";

window.Alpine = Alpine;

export default function initAlpine({ logger }) {
  Alpine.magic("logger", () => logger);

  registerComponents(components);

  Alpine.start();
}
