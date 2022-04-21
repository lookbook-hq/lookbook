async function fetchHTML(url, selector) {
  const response = await fetch(url || window.document.location);
  if (response.ok) {
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    return {
      fragment: selector ? doc.querySelector(selector).outerHTML : null,
      title: doc.title,
      doc,
    };
  } else {
    throw new Error(`Error fetching HTML from ${url}`);
  }
}

export { fetchHTML };
