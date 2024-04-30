import AlpineComponent from "@js/alpine/component";

export default AlpineComponent("displayOptionsDropdown", () => {
  return {
    init() {
      this.$el.addEventListener("change", (event) => this.update(event));
    },

    update(event) {
      const input = event.target;
      const searchParams = new URLSearchParams(window.location.search);
      const display = searchParams.get("_display");

      const displayParams = display ? parseSearchParamValue(display) : {};
      displayParams[input.name] = input.value;
      searchParams.set("_display", buildSearchParamValue(displayParams));

      const path = location.href.replace(location.search, "");
      this.$dispatch("lookbook:visit", {
        url: `${path}?${searchParams.toString()}`,
      });
    },
  };
});

function parseSearchParamValue(value) {
  const json = decodeURIComponent(value);
  return JSON.parse(json);
}

function buildSearchParamValue(data) {
  const str = JSON.stringify(data);
  return encodeURIComponent(str);
}
