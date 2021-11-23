export default function param() {
  return {
    focused: false,
    setFocus() {
      if (this.focused && this.$el.focus) {
        this.$el.focus();
      }
    },
    update(name, value) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set(name, value);
      const path = location.href.replace(location.search, "");
      this.navigateTo(`${path}?${searchParams.toString()}`);
    },
    validate() {
      return this.$el.reportValidity ? this.$el.reportValidity() : true;
    },
  };
}
