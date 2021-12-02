export default function createNavStore(Alpine) {
  return {
    open: Alpine.$persist([]).as("nav-open"),
    active: Alpine.$persist(null).as("nav-active"),
    isOpen(id) {
      return this.open.includes(id);
    },
    setOpen(id) {
      this.open.push(id);
    },
    setClosed(id) {
      const index = this.open.indexOf(id);
      if (index > -1) {
        this.open.splice(index, 1);
      }
    },
    toggle(id) {
      this.isOpen(id) ? this.setClosed(id) : this.setOpen(id);
    },
  };
}
