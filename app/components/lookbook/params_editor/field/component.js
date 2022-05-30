export default function paramsEditorFieldComponent({ name, value }) {
  return {
    name,
    value,

    init() {
      this.$watch("value", () => this.update());
    },

    update() {
      if (this.validate()) {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set(this.name, this.value);
        const path = location.href.replace(location.search, "");
        this.navigateTo(`${path}?${searchParams.toString()}`);
      }
    },

    validate() {
      return this.$root.reportValidity ? this.$root.reportValidity() : true;
    },

    get isNarrowLayout() {
      return this.narrow || false;
    },

    bindings: {
      input: {
        [":id"]: "`param-${name}`",
        ["x-ref"]: "input",
        ["x-model.debounce.200"]: "value",
        ["@keydown.stop"]: true,
      },
    },
  };
}
