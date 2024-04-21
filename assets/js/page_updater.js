export default class PageUpdater {
  constructor(root, selector) {
    this.root = root;
    this.selector = selector;
  }

  async updateDOM(url) {
    const { fragment, status } = await fetchHTML(url, this.selector);
    if (status < 500) {
      Alpine.morph(this.root, fragment);
    } else {
      location.href = url;
    }
  }
}

async function fetchHTML(url, selector) {
  const response = await fetch(url || location);
  const { status, ok } = response;
  let fragment,
    title = null;
  const result = { ok, status, response, fragment, title };
  if (status < 500) {
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    result.fragment = selector ? doc.querySelector(selector).outerHTML : null;
  }
  return result;
}
