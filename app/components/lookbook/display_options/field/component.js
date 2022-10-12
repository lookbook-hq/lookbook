import Cookies from "js-cookie";

export default function displayOptionsFieldComponent({ name, value }) {
  return {
    name,
    value,

    init() {
      this.$watch("value", () => this.update());
    },

    update() {
      Cookies.set(`lookbook-display-${name}`, this.value);
      this.$dispatch("viewport:reload");
    },
  };
}
