import { setDefaultAnimation } from "@shoelace-style/shoelace/dist/utilities/animation-registry.js";

setDefaultAnimation("tooltip.show", {
  keyframes: [{ opacity: "0" }, { opacity: "1" }],
  options: {
    duration: 200,
  },
});

setDefaultAnimation("tooltip.hide", {
  keyframes: [{ opacity: "1" }, { opacity: "0" }],
  options: {
    duration: 200,
  },
});
