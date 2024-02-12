import Alpine from "alpinejs";
import morph from "@alpinejs/morph";
import persist from "@alpinejs/persist";

window.Alpine = Alpine;

Alpine.plugin(morph);
Alpine.plugin(persist);

Alpine.start();
