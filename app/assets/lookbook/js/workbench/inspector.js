export default function inspector() {
  const inspector = Alpine.store("inspector");
  return {
    switchTo(id) {
      inspector.active = id;
    },
    active(id) {
      return inspector.active === id;
    },
  };
}
