export default function param() {
  return {
    setFocus() {
      if (this.$refs.input) {
        setTimeout(() => this.$refs.input.focus(), 0);
      }
    },
    update(name, value) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set(name, value);
      const path = location.href.replace(location.search, "");
      this.setLocation(`${path}?${searchParams.toString()}`);
    },
    validate() {
      return this.$el.reportValidity ? this.$el.reportValidity() : true;
    },
  };
}
