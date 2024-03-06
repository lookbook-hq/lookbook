import AlpineComponent from "@js/alpine/component";

export default AlpineComponent("sidebar", () => {
  return {
    splitPosition: Alpine.$persist(50).as("sidebar:split-position"),
  };
});
