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

    viewport: {
      width: 100000,
      height: 100000,
    },

    trees: {},
    tabs: {},
  });

  // Tabs

  getTabsState(id) {
    let tabs = this.#currentState.tabs;

    tabs[id] = tabs[id] || { active: null };
    return tabs[id];
  }

  setTabState(id, state) {
    const currentState = this.getTabsState(id);
    Object.assign(currentState, state);
  }

  // Trees

  getTreeState(id) {
    let trees = this.#currentState.trees;

    trees[id] = trees[id] || {
      filter: "",
      expanded: [],
      selected: [],
    };

    return trees[id];
  }

  setTreeState(id, state) {
    const currentState = this.getTreeState(id);
    Object.assign(currentState, state);
  }

  // Other

  get workbench() {
    return this.#currentState.workbench;
  }

  get inspector() {
    return this.#currentState.inspector;
  }

  get viewport() {
    return this.#currentState.viewport;
  }

  get #currentState() {
    return this.storedState.current;
  }
}

export const appState = $state(new AppState());
