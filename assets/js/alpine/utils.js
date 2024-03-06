import Alpine from "alpinejs";

function registerComponents(entries) {
  for (const key in entries) {
    const entry = entries[key];
    if (entry.__esModule === true && "default" in entry) {
      Alpine.data(
        entry.default.componentName || entry.default.name,
        entry.default
      );
    } else {
      registerComponents(entry);
    }
  }
}

function getData(el) {
  const root = Alpine.closestRoot(el);
  return root ? Alpine.$data(root) : null;
}

export { registerComponents, getData };
