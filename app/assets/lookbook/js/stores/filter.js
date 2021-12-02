export default function createFilterStore(Alpine) {
  return {
    raw: Alpine.$persist("").as("filter-text"),
    get text() {
      return this.raw.replace(/\s/g, "").toLowerCase();
    },
    get active() {
      return this.text.length > 0;
    },
  };
}
