import initFilterStore from "./filter";
import { prefixString } from "../helpers/string";

export default function initWorkbenchStore(Alpine, { prefix }) {
  return {
    filter: initFilterStore(Alpine, prefixString("workbench-filter", prefix)),
    nav: {
      open: Alpine.$persist([]).as(prefixString("workbench-nav-open", prefix)),
      location: {
        pathname: null,
      },
    },
  };
}
