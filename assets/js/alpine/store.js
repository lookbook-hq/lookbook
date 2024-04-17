export default function initStore(id) {
  return {
    data: Alpine.$persist({}).as(`store#${id}`),

    fetch(type, id, default_value) {
      if (!this.data[type]) {
        this.data[type] = {};
      }

      if (!this.data[type][id] && default_value) {
        this.data[type][id] = default_value;
      }

      return this.data[type][id];
    },

    clear() {
      Object.keys(this.data).forEach((key) => delete this.data[key]);
    },
  };
}
