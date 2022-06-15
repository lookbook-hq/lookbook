export default function pageTabs() {
  return {
    active: "",

    changeTab(tabName) {
      this.active = tabName;
    },
  };
}
