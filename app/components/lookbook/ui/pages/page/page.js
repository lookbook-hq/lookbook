import AlpineComponent from "@js/alpine/component";

export default AlpineComponent("page", () => {
  return {
    init() {
      setTimeout(() => this.scrollToTarget(), 1);
    },

    scrollToTarget() {
      if (location.hash?.startsWith("#")) {
        const scrollTarget = this.$root.querySelector(location.hash);
        if (scrollTarget) {
          scrollTarget.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
  };
});
