export default function initNavStore(Alpine) {
  return {
    previews: {
      filter: {
        raw: Alpine.$persist("").as("previews-filter-text"),
        get text() {
          return this.raw.replace(/\s/g, "").toLowerCase();
        },
        get active() {
          return this.text.length > 0;
        },
      },
      open: Alpine.$persist([]).as("previews-nav-open"),
    },

    pages: {
      filter: {
        raw: Alpine.$persist("").as("pages-filter-text"),
        get text() {
          return this.raw.replace(/\s/g, "").toLowerCase();
        },
        get active() {
          return this.text.length > 0;
        },
      },
      open: Alpine.$persist([]).as("pages-nav-open"),
    },
  };
}
