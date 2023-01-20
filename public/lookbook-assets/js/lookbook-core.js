(() => {
window.Lookbook = window.Lookbook || {};
window.Lookbook.initEmbeds = $8c6f87050723dba0$var$initEmbeds;
const $8c6f87050723dba0$var$embedUrlPrefix = "embed";
const $8c6f87050723dba0$var$whiteListedAttributes = [
    "preview",
    "scenario",
    "panels",
    "actions",
    "param-*"
];
function $8c6f87050723dba0$var$initEmbeds() {
    if (typeof window.iFrameResize !== "function") {
        console.error("Lookbook embeds require the 'iframe-resizer' library to be available. Skipping embed instantiation.");
        return;
    }
    const embeds = Array.from(document.querySelectorAll("lookbook-embed"));
    embeds.forEach((embed)=>{
        const attrs = Array.from(embed.attributes);
        const wrapper = $8c6f87050723dba0$var$createWrapper();
        const iframe = $8c6f87050723dba0$var$createIframe(attrs);
        wrapper.appendChild(iframe);
        embed.replaceWith(wrapper);
    });
    window.iFrameResize({
        checkOrigin: false
    }, "[data-lookbook-embed-iframe]");
}
function $8c6f87050723dba0$var$createWrapper() {
    const wrapper = document.createElement("div");
    wrapper.setAttribute("data-lookbook-embed", "");
    wrapper.classList.add("lookbook-embed");
    return wrapper;
}
function $8c6f87050723dba0$var$createIframe(attrs) {
    const src = $8c6f87050723dba0$var$buildSrc(attrs);
    const id = $8c6f87050723dba0$var$attrValue(attrs, "id");
    const styles = $8c6f87050723dba0$var$attrValue(attrs, "style");
    const classes = $8c6f87050723dba0$var$attrValue(attrs, "class", "").split(" ").map((c)=>c.trim()).filter((c)=>c.length);
    const iframe = document.createElement("iframe");
    iframe.src = src;
    if (id) iframe.id = id;
    iframe.setAttribute("frameborder", 0);
    iframe.setAttribute("data-lookbook-embed-iframe", "");
    if (classes.length) iframe.classList.add(...classes);
    if (styles) iframe.style.cssText = styles;
    iframe.style.width = "100%";
    iframe.style.transition = "height 0.3s";
    return iframe;
}
function $8c6f87050723dba0$var$buildSrc(attrs) {
    const appPath = $8c6f87050723dba0$var$attrValue(attrs, "app") || $8c6f87050723dba0$var$guessBasePath();
    const props = {};
    $8c6f87050723dba0$var$permittedAttrs(attrs).forEach(({ name: name , value: value  })=>{
        console.log(name, value);
        name = name.replace("-", "_").toLowerCase();
        props[name] = value;
    });
    return encodeURI([
        appPath,
        $8c6f87050723dba0$var$embedUrlPrefix
    ].join("/") + `?props=${JSON.stringify(props)}`);
}
function $8c6f87050723dba0$var$attrValue(attrs, name, fallback = null) {
    const attr = attrs.find((attr)=>attr.name === name);
    return attr ? attr.value : fallback;
}
function $8c6f87050723dba0$var$permittedAttrs(attrs) {
    return attrs.filter((attr)=>{
        return $8c6f87050723dba0$var$whiteListedAttributes.find((key)=>{
            const name = attr.name;
            return key === name || key.includes("*") && name.startsWith(key.replace("*", ""));
        });
    });
}
function $8c6f87050723dba0$var$guessBasePath() {
    const script = document.currentScript || document.querySelector('script[src*="lookbook.js"]');
    const scriptSrc = script.src;
    if (scriptSrc && scriptSrc.includes("lookbook-assets")) return scriptSrc.replace("lookbook-assets/js/lookbook.js", "lookbook");
    return `//${location.host}/lookbook`;
}
document.addEventListener("DOMContentLoaded", ()=>$8c6f87050723dba0$var$initEmbeds());



})();
