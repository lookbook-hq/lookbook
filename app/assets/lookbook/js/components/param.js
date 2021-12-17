import debounce from "debounce";

export default function param(name, value, opts = {}) {
  return {
    name,
    value,
    updating: false,
    init() {
      if (opts.debounce) {
        this.$watch(
          "value",
          debounce(() => this.updateIfValid(), opts.debounce)
        );
      } else {
        this.$watch("value", () => this.updateIfValid());
      }
    },
    setFocus() {
      setTimeout(() => this.$root.focus(), 0);
    },
    updateIfValid() {
      if (this.validate()) this.update();
    },
    update() {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set(this.name, this.value);
      const path = location.href.replace(location.search, "");
      this.setLocation(`${path}?${searchParams.toString()}`);
    },
    validate() {
      return this.$root.reportValidity ? this.$root.reportValidity() : true;
    },
  };
}
