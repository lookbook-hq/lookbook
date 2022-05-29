import initFilterStore from "./filter";

export default function initWorkbenchStore(Alpine) {
  return {
    filter: initFilterStore(Alpine, "workbench-filter"),
  };
}
