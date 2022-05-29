import initFilterStore from "./filter";

export default function initWorkbenchStore(Alpine) {
  return {
    filter: initFilterStore(Alpine, "workbench-filter"),
    nav: {
      open: Alpine.$persist([]).as("workbench-nav-open"),
      location: {
        pathname: null,
      },
    },
  };
}
