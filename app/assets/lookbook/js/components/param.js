import debounce from "debounce";

export default function param(name, value) {
  return {
    name,
    value,
    init() {
      this.$watch(
        "value",
        debounce(() => {
          if (this.validate()) {
            this.update();
          }
        }, 300)
      );
    },
    setFocus() {
      if (this.$refs.input) {
        setTimeout(() => this.$refs.input.focus(), 0);
      }
    },
    update() {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set(this.name, this.value);
      const path = location.href.replace(location.search, "");
      this.setLocation(`${path}?${searchParams.toString()}`);
    },
    validate() {
      return this.$el.reportValidity ? this.$el.reportValidity() : true;
    },
  };
}
