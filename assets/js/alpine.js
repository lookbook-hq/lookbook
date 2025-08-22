import Alpine from "alpinejs";

/* -- Plugins --------------------------------- */

import morph from "@alpinejs/morph";
import resize from "@alpinejs/resize";
import persist from "@alpinejs/persist";
import collapse from "@alpinejs/collapse";
import ajax from "@imacrayon/alpine-ajax";

Alpine.plugin(morph);
Alpine.plugin(resize);
Alpine.plugin(persist);
Alpine.plugin(collapse);
Alpine.plugin(
  ajax.configure({
    mergeStrategy: "morph",
  })
);

/* -- Magics ---------------------------------- */

import Logger from "&js/logger";

Alpine.magic("addOrRemove", () => (item, array) => {
  const index = array.indexOf(item);
  index === -1 ? array.push(item) : array.splice(index, 1);
});

const logger = new Logger();
Alpine.magic("logger", () => logger);
Alpine.magic("debug", () => logger.debug.bind(logger));
Alpine.magic("info", () => logger.info.bind(logger));
Alpine.magic("warn", () => logger.warn.bind(logger));
Alpine.magic("error", () => logger.error.bind(logger));

/* -- Components ------------------------------ */

import codeBlock from "&js/components/code_block";
import splitLayout from "&js/components/split_layout";
import viewport from "&js/components/viewport";

Alpine.data("codeBlock", codeBlock);
Alpine.data("splitLayout", splitLayout);
Alpine.data("viewport", viewport);

/* -- Init ------------------------------------ */

window.Alpine = Alpine;

export default Alpine;
