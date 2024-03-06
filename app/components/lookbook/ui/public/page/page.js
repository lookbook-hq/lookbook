import AlpineComponent from "@js/alpine/component";

export default AlpineComponent("page", () => {
  return {
    init() {
      this.$logger.debug("Page initialized", this.$el);
    },

    // handlePageClick(event){
    //   const link = event.target.closest("[href]");
    //   if (link) {
    //     const isExternalLink = link.host && link.host !== window.location.host;

    //     if (!isExternalLink && !link.hasAttribute("target")) {
    //       event.preventDefault();
    //       this.visit(link.href);
    //     }
    //   }
    // }
  };
});
