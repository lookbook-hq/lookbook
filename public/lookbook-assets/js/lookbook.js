(() => {
window.Lookbook = window.Lookbook || {};
window.Lookbook.initEmbeds = $d73574cc5e9b9e72$var$initEmbeds;
const $d73574cc5e9b9e72$var$embedUrlPrefix = "embed";
const $d73574cc5e9b9e72$var$whiteListedAttributes = [
    "preview",
    "scenario",
    "panels",
    "actions",
    "param-*"
];
function $d73574cc5e9b9e72$var$initEmbeds() {
    if (typeof window.iFrameResize !== "function") {
        console.error("Lookbook embeds require the 'iframe-resizer' library to be available. Skipping embed instantiation.");
        return;
    }
    const embeds = Array.from(document.querySelectorAll("lookbook-embed"));
    embeds.forEach((embed)=>{
        const attrs = Array.from(embed.attributes);
        const wrapper = $d73574cc5e9b9e72$var$createWrapper();
        const iframe = $d73574cc5e9b9e72$var$createIframe(attrs);
        wrapper.appendChild(iframe);
        embed.replaceWith(wrapper);
    });
    window.iFrameResize({
        checkOrigin: false
    }, "[data-lookbook-embed-iframe]");
}
function $d73574cc5e9b9e72$var$createWrapper() {
    const wrapper = document.createElement("div");
    wrapper.setAttribute("data-lookbook-embed", true);
    wrapper.classList.add("lookbook-embed");
    return wrapper;
}
function $d73574cc5e9b9e72$var$createIframe(attrs) {
    const src = $d73574cc5e9b9e72$var$buildSrc(attrs);
    const id = $d73574cc5e9b9e72$var$attrValue(attrs, "id");
    const styles = $d73574cc5e9b9e72$var$attrValue(attrs, "style");
    const classes = $d73574cc5e9b9e72$var$attrValue(attrs, "class", "").split(" ").map((c)=>c.trim()).filter((c)=>c.length);
    const iframe = document.createElement("iframe");
    iframe.src = src;
    if (id) iframe.id = id;
    iframe.setAttribute("frameborder", 0);
    iframe.setAttribute("data-lookbook-embed-iframe", true);
    if (classes.length) iframe.classList.add(...classes);
    if (styles) iframe.style.cssText = styles;
    iframe.style.width = "100%";
    iframe.style.transition = "height 0.3s";
    return iframe;
}
function $d73574cc5e9b9e72$var$buildSrc(attrs) {
    const appPath = $d73574cc5e9b9e72$var$attrValue(attrs, "app") || $d73574cc5e9b9e72$var$guessBasePath();
    const props = {};
    $d73574cc5e9b9e72$var$permittedAttrs(attrs).forEach(({ name: name , value: value  })=>{
        console.log(name, value);
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
function $d73574cc5e9b9e72$var$permittedAttrs(attrs) {
    return attrs.filter((attr)=>{
        return $d73574cc5e9b9e72$var$whiteListedAttributes.find((key)=>{
            const name = attr.name;
            return key === name || key.includes("*") && name.startsWith(key.replace("*", ""));
        });
    });
}
function $d73574cc5e9b9e72$var$guessBasePath() {
    const script = document.currentScript || document.querySelector('script[src*="lookbook.js"]');
    const scriptSrc = script.src;
    if (scriptSrc && scriptSrc.includes("lookbook-assets")) return scriptSrc.replace("lookbook-assets/js/lookbook.js", "lookbook");
    return `//${location.host}/lookbook`;
}
document.addEventListener("DOMContentLoaded", ()=>$d73574cc5e9b9e72$var$initEmbeds());

})();
//# sourceMappingURL=lookbook.js.map
