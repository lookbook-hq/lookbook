import AlpineComponent from "@js/alpine/component";
import Cookies from "js-cookie";

const colorSchemeCookie = "lookbook-color-scheme";

export default AlpineComponent("colorSchemeSwitcher", () => {
  const store = Alpine.store("app");
  store.setDefault("colorScheme", "light");

  return {
    init() {
      this.onSystemSchemeChange = this.onSystemSchemeChange.bind(this);
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", this.onSystemSchemeChange);
    },

    onSystemSchemeChange(event) {
      this.applyScheme(event.matches ? "dark" : "light");
    },

    applyScheme(scheme) {
      const schemeValue = scheme === "system" ? this.systemScheme : scheme;
      document.documentElement.setAttribute("data-color-scheme", schemeValue);
      Cookies.set(colorSchemeCookie, schemeValue);
    },

    setScheme(scheme) {
      store.set("colorScheme", scheme);
      this.applyScheme(scheme);
      this.$nextTick(() => this.$dispatch("color-scheme:change"));
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
