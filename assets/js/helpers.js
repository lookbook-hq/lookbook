function observeSize(element, callback = () => {}) {
  const observer = new ResizeObserver((entries) => {
    const rect = entries[0].target.getBoundingClientRect();
    callback({
      width: Math.round(rect.width),
      height: Math.round(rect.height),
    });
  });
  observer.observe(element);
  return observer;
}

async function fetchHTML(url, selector, options = {}) {
  const response = await fetch(url || location, options);
  const { status, ok } = response;
  let fragment,
    title = null;
  const result = { ok, status, response, fragment, title, url: response.url };
  if (status < 500) {
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    result.fragment = selector ? doc.querySelector(selector).outerHTML : null;
  }
  return result;
}

export { observeSize, fetchHTML };
