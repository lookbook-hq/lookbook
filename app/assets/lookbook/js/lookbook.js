import Alpine from "alpinejs";

import { getComponents } from "./helpers/build";

import * as files from "../../../components/lookbook/**/*/component.js";

// Components

getComponents(files).forEach((component) =>
  Alpine.data(component.name, component)
);

window.Alpine = Alpine;
Alpine.start();
