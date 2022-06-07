export default function pageTabs() {
  return {
    active: "",

    changeTab(tabName) {
      this.active = tabName;
      document
        .querySelector(`#tab-${tabName}`)
        .querySelectorAll("iframe")
        .forEach((iframe) => {
          // iframe.click();
        });
    },
  };
}
