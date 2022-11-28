import "iframe-resizer/js/iframeResizer";

(function (win, doc) {
  const endpoint = "embed";
  const defaultBasePath = `//${location.host}/lookbook`;

  function createIframe(attrs) {
    const src = buildSrc(attrs);
    const id = attrValue(attrs, "id");
    const classes = attrValue(attrs, "class", "")
      .split(" ")
      .map((c) => c.trim())
      .filter((c) => c.length);

    const iframe = doc.createElement("iframe");
    iframe.src = src;
    if (id) iframe.id = id;

    iframe.setAttribute("frameborder", 0);
    iframe.setAttribute("data-lookbook-embed", true);

    if (classes.length) iframe.classList.add(...classes);
    iframe.style.width = "100%";
    iframe.style.transition = "height 0.3s";
    iframe.style.boxShadow = "0px 0px 4px rgba(0,0,0,0.15)";
    iframe.style.borderRadius = "8px";

    return iframe;
  }

  function buildSrc(attrs) {
    const basePath = attrValue(attrs, "base") || defaultBasePath;

    const props = {};
    attrsWithout(attrs, "base", "class").forEach(({ name, value }) => {
      name = name.replace("-", "_").toLowerCase();
      value = encodeURIComponent(value);
      props[name] = value;
    });

    return [basePath, endpoint].join("/") + `?props=${JSON.stringify(props)}`;
  }

  function attrValue(attrs, name, fallback = null) {
    const attr = attrs.find((attr) => attr.name === name);
    return attr ? attr.value : fallback;
  }

  function attrsWithout(attrs, ...without) {
    return attrs.filter((attr) => !without.includes(attr.name));
  }

  doc.addEventListener("DOMContentLoaded", () => {
    const embeds = doc.querySelectorAll("lookbook-embed");

    Array.from(embeds).forEach((embed) => {
      const attrs = Array.from(embed.attributes);
      const iframe = createIframe(attrs);
      embed.replaceWith(iframe);
    });

    window.iFrameResize({}, "[data-lookbook-embed]");
  });
})(window, document);
