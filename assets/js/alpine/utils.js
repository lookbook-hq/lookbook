import Alpine from "alpinejs";

function registerComponents(entries) {
  entries.forEach((entry) => {
    Alpine.data(entry.default.componentName, entry.default);
  });
}

function getData(el) {
  const root = Alpine.closestRoot(el);
  return root ? Alpine.$data(root) : null;
}

export { registerComponents, getData };
