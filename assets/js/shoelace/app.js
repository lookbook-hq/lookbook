import initShoelace from "./setup";

import "@shoelace-style/shoelace/dist/components/icon/icon.js";

import "@shoelace-style/shoelace/dist/components/button/button.js";
import "@shoelace-style/shoelace/dist/components/icon-button/icon-button.js";
import "@shoelace-style/shoelace/dist/components/copy-button/copy-button.js";
import "@shoelace-style/shoelace/dist/components/button-group/button-group.js";

import "@shoelace-style/shoelace/dist/components/input/input.js";

import "@shoelace-style/shoelace/dist/components/split-panel/split-panel.js";

import "@shoelace-style/shoelace/dist/components/tree/tree.js";
import "@shoelace-style/shoelace/dist/components/tree-item/tree-item.js";

import "@shoelace-style/shoelace/dist/components/tab-group/tab-group.js";
import "@shoelace-style/shoelace/dist/components/tab/tab.js";
import "@shoelace-style/shoelace/dist/components/tab-panel/tab-panel.js";

import "@shoelace-style/shoelace/dist/components/popup/popup.js";
import "@shoelace-style/shoelace/dist/components/dropdown/dropdown.js";
import "@shoelace-style/shoelace/dist/components/tooltip/tooltip.js";
import "@shoelace-style/shoelace/dist/components/resize-observer/resize-observer.js";

import { setDefaultAnimation } from "@shoelace-style/shoelace/dist/utilities/animation-registry.js";

setDefaultAnimation("tooltip.hide", {
  keyframes: [{ opacity: "1" }, { opacity: "0" }],
  options: {
    duration: 0,
  },
});

export default initShoelace;
