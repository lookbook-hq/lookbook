import { fetchHTML } from "./helpers";

export default class PageUpdater {
  constructor(root, selector) {
    this.root = root;
    this.selector = selector;
  }

  async updateDOM(url) {
    const { fragment, status } = await fetchHTML(url, this.selector);
    if (status < 500) {
      document.dispatchEvent(new CustomEvent("morph:start"));
      Alpine.morph(this.root, fragment);
      document.dispatchEvent(new CustomEvent("morph:complete"));
    } else {
      location.href = url;
    }
  }
}
