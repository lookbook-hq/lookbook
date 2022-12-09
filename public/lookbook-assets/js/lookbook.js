(() => {
window.Lookbook = window.Lookbook || {};
window.Lookbook.initEmbeds = function() {
    if (typeof window.iFrameResize !== "function") {
        console.error("Lookbook embeds require the 'iframe-resizer' library to be available. Skipping embed instantiation.");
        return;
    }
    const embeds = Array.from(document.querySelectorAll("lookbook-embed"));
    embeds.forEach((embed)=>{
        const attrs = Array.from(embed.attributes);
        const iframe = $d73574cc5e9b9e72$var$createIframe(attrs);
        embed.replaceWith(iframe);
    });
    window.iFrameResize({
        checkOrigin: false
    }, "[data-lookbook-embed]");
};
const $d73574cc5e9b9e72$var$embedUrlPrefix = "embed";
const $d73574cc5e9b9e72$var$defaultBasePath = `//${location.host}/lookbook`;
function $d73574cc5e9b9e72$var$createIframe(attrs) {
    const src = $d73574cc5e9b9e72$var$buildSrc(attrs);
    const id = $d73574cc5e9b9e72$var$attrValue(attrs, "id");
    const classes = $d73574cc5e9b9e72$var$attrValue(attrs, "class", "").split(" ").map((c)=>c.trim()).filter((c)=>c.length);
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
function $d73574cc5e9b9e72$var$buildSrc(attrs) {
    const appPath = $d73574cc5e9b9e72$var$attrValue(attrs, "app") || $d73574cc5e9b9e72$var$defaultBasePath;
    const props = {};
    $d73574cc5e9b9e72$var$attrsWithout(attrs, "app", "class").forEach(({ name: name , value: value  })=>{
        name = name.replace("-", "_").toLowerCase();
        props[name] = value;
    });
    return encodeURI([
        appPath,
        $d73574cc5e9b9e72$var$embedUrlPrefix
    ].join("/") + `?props=${JSON.stringify(props)}`);
}
function $d73574cc5e9b9e72$var$attrValue(attrs, name, fallback = null) {
    const attr = attrs.find((attr)=>attr.name === name);
    return attr ? attr.value : fallback;
}
function $d73574cc5e9b9e72$var$attrsWithout(attrs, ...without) {
    return attrs.filter((attr)=>!without.includes(attr.name));
}

})();
//# sourceMappingURL=lookbook.js.map
