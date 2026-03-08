import { router } from "@inertiajs/svelte";
import { getCurrentContext } from "@lib/utils";
import * as qs from "qs-esm";
import { SvelteURL } from "svelte/reactivity";

export function queryParams(definedParams = []) {
  const request = getCurrentContext().request;
  const urlState = new SvelteURL(request.url);
  const searchParams = urlState.searchParams.toString();
  const params = qs.parse(searchParams)?.params || {};

  definedParams = typeof definedParams === "function" ? definedParams() : definedParams;
  definedParams.forEach((param) => {
    if (!params[param.name]) {
      params[param.name] = param.value;
    }
  });

  const getParam = (name) => definedParams.find((p) => p.name === name);

  return {
    get(name) {
      const param = getParam(name);

      if (param.valueType === "boolean") {
        return params[name] === "true";
      } else {
        return params[name];
      }
    },

    set(name, value) {
      const param = getParam(name);

      if (value === null) {
        delete params[name];
      } else if (param.valueType === "boolean") {
        params[name] = value ? "true" : "false";
      } else {
        params[name] = value;
      }

      // update URL
      urlState.searchParams.set(`params[${name}]`, value);

      router.get(
        urlState.href,
        {},
        {
          replace: true,
          preserveState: true,
          viewTransition: false,
        }
      );
    },
  };
}
