export default function initStore(id) {
  return {
    data: Alpine.$persist({}).as(`store#${id}`),

    set(key, value) {
      this.data[key] = value;
    },

    setDefault(key, value) {
      if (!this.data.hasOwnProperty(key)) {
        this.data[key] = value;
      }
    },

    get(key) {
      return this.data[key];
    },

    fetch(type, key, default_value = null) {
      if (!this.data[type]) {
        this.data[type] = {};
      }

      if (!this.data[type][key] && default_value) {
        this.data[type][key] = default_value;
      }

      return this.data[type][key];
    },

    clear() {
      Object.keys(this.data).forEach((key) => delete this.data[key]);
    },
  };
}
