window.Lookbook = window.Lookbook || {};

window.Lookbook.initEmbeds = function () {
  if (typeof window.iFrameResize !== "function") {
    console.error(
      "Lookbook embeds require the 'iframe-resizer' library to be available. Skipping embed instantiation."
    );
    return;
  }

  const embeds = Array.from(document.querySelectorAll("lookbook-embed"));

  embeds.forEach((embed) => {
    const attrs = Array.from(embed.attributes);
    const iframe = createIframe(attrs);
    embed.replaceWith(iframe);
  });

  window.iFrameResize({ checkOrigin: false }, "[data-lookbook-embed]");
};

const embedUrlPrefix = "embed";
const defaultBasePath = `//${location.host}/lookbook`;

function createIframe(attrs) {
  const src = buildSrc(attrs);
  const id = attrValue(attrs, "id");
  const classes = attrValue(attrs, "class", "")
    .split(" ")
    .map((c) => c.trim())
    .filter((c) => c.length);

  const iframe = document.createElement("iframe");
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
  const appPath = attrValue(attrs, "app") || defaultBasePath;

  const props = {};
  attrsWithout(attrs, "app", "class").forEach(({ name, value }) => {
    name = name.replace("-", "_").toLowerCase();
    props[name] = value;
  });

  return encodeURI(
    [appPath, embedUrlPrefix].join("/") + `?props=${JSON.stringify(props)}`
  );
}

function attrValue(attrs, name, fallback = null) {
  const attr = attrs.find((attr) => attr.name === name);
  return attr ? attr.value : fallback;
}

function attrsWithout(attrs, ...without) {
  return attrs.filter((attr) => !without.includes(attr.name));
}
