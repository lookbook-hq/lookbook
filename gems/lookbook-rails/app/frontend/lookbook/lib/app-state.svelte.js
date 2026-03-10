import { PersistedState } from "runed";

class AppState {
  storedState = new PersistedState("lookbook:app", {
    workbench: {
      sidebar: {
        orientation: "horizontal",
        width: 300,
      },
    },

    inspector: {
      drawer: {
        orientation: "vertical",
        height: 300,
      },

      sidebar: {
        orientation: "horizontal",
        width: 200,
      },
    },
  });

  get workbench() {
    return this.#currentState.workbench;
  }

  get inspector() {
    return this.#currentState.inspector;
  }

  get #currentState() {
    return this.storedState.current;
  }
}

export const appState = $state(new AppState());
