import AlpineComponent from "@js/alpine/component";

export default AlpineComponent("statusBar", () => {
  return {
    reset() {
      localStorage.clear();
      window.location.reload();
    },
  };
});
