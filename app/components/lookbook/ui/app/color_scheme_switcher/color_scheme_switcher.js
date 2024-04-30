import AlpineComponent from "@js/alpine/component";

export default AlpineComponent("colorSchemeSwitcher", () => {
  const store = Alpine.store("app");
  store.setDefault("colorScheme", "light");

  return {
    init() {
      this.onSystemSchemeChange = this.onSystemSchemeChange.bind(this);
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", this.onSystemSchemeChange);
      this.setScheme(store.get("colorScheme"));
    },

    onSystemSchemeChange(event) {
      this.applyScheme(event.matches ? "dark" : "light");
    },

    applyScheme(scheme) {
      const schemeValue = scheme === "system" ? this.systemScheme : scheme;
      document.documentElement.setAttribute("data-color-scheme", schemeValue);
    },

    setScheme(scheme) {
      store.set("colorScheme", scheme);
      this.applyScheme(scheme);
    },

    isActiveScheme(scheme) {
      return store.get("colorScheme") === scheme;
    },

    destroy() {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", this.onSystemSchemeChange);
    },

    get systemScheme() {
      return window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    },
  };
});
