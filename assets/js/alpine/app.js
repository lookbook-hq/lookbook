import Alpine from "alpinejs";
import morph from "@alpinejs/morph";
import persist from "@alpinejs/persist";
import { registerComponents } from "./utils";
import components from "../../../app/components/lookbook/ui/**/*.js";

window.Alpine = Alpine;

export default function initAlpine({ logger }) {
  Alpine.plugin(morph);
  Alpine.plugin(persist);

  Alpine.magic("logger", () => logger);

  registerComponents(components);

  Alpine.start();
}
