import { createInertiaApp } from "@inertiajs/svelte";
import { mount } from "svelte";

import App from "@components/app";

createInertiaApp({
  id: "root",
  progress: false,
  defaults: {
    future: {
      useScriptElementForInitialPage: true,
      useDialogForErrorModal: true,
      useDataInertiaHeadAttribute: true,
    },

    visitOptions: () => {
      return { viewTransition: true };
    },
  },

  resolve: (name) => {
    const pages = import.meta.glob("../views/**/*.svelte", { eager: true });
    const page = pages[`../views/${name}.svelte`];

    return { default: page.default, layout: page.layout || App };
  },

  setup({ el, App, props }) {
    mount(App, { target: el, props });
  },
});
