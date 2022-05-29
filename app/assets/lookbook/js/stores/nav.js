import initFilterStore from "./filter";

export default function initNavStore(Alpine) {
  return {
    previews: {
      filter: initFilterStore(Alpine, "previews-filter-text"),
      open: Alpine.$persist([]).as("previews-nav-open"),
    },

    pages: {
      filter: initFilterStore(Alpine, "pages-filter-text"),
      open: Alpine.$persist([]).as("pages-nav-open"),
    },
  };
}
