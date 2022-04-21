function morph(from, to) {
  Alpine.morph(from, to, {
    key(el) {
      return el.getAttribute("key") ? el.getAttribute("key") : el.id;
    },
    lookahead: true,
    updating(el, toEl, childrenOnly, skip) {
      if (
        el.getAttribute &&
        el.getAttribute("data-morph-strategy") === "replace"
      ) {
        el.innerHTML = toEl.innerHTML;
        return skip();
      }
    },
  });
}

export { morph };
