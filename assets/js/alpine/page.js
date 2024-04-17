import Alpine from "alpinejs";
import { registerComponents } from "./utils";
import baseComponents from "../../../app/components/lookbook/ui/elements/{code,prose}/*.js";
import pageComponents from "../../../app/components/lookbook/ui/pages/page/*.js";

window.Alpine = Alpine;

export default function initAlpine({ logger }) {
  Alpine.magic("logger", () => logger);

  registerComponents(baseComponents);
  registerComponents(pageComponents);

  Alpine.start();
}
