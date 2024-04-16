import Alpine from "alpinejs";
import { registerComponents } from "./utils";
import baseComponents from "../../../app/components/lookbook/ui/base/{code,prose}/*.js";
import pageComponents from "../../../app/components/lookbook/ui/app/page/*.js";

window.Alpine = Alpine;

export default function initAlpine({ logger }) {
  Alpine.magic("logger", () => logger);

  registerComponents(baseComponents);
  registerComponents(pageComponents);

  Alpine.start();
}
