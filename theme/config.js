module.exports = function (opts = {}) {
  const white = theme("white");
  const black = theme("black");

  return {
    text: base(800),
    divider: base(300),

    brandingText: black,

    buttonText: base(400),
    buttonTextHover: accent(600),

    tooltip: accent(500),
    tooltipText: white,

    scrollbar: base(200),
    scrollbarHover: base(300),

    toolbar: white,
    toolbarDivider: "var(--lookbook-divider)",

    navText: "var(--lookbook-text)",
    navToggle: base(500),
    navIcon: accent(500),
    navItemHover: base(100),
    navItemActive: accent(50),

    input: white,
    inputBorder: base(300),
    inputBorderFocus: accent(200),
    inputText: base(600),
    inputTextPlaceholder: base(400),
    inputToggle: base(300),
    inputToggleActive: accent(500),

    prose: white,
    proseText: base(600),
    proseLink: accent(900),

    tabsText: base(500),
    tabsTextHover: base(700),
    tabsTextDisabled: base(300),
    tabsHighlight: accent(400),

    viewportHandle: white,
    viewportHandleIcon: base(300),
    viewportHandleIconHover: base(700),

    sidebar: base(50),
    page: white,
    drawer: base(50),

    draggableHint: "rgb(224 231 255 / 0.2)",
  };

  function base(depth) {
    return theme(opts.base || "zinc", depth);
  }

  function accent(depth) {
    return theme(opts.accent || "indigo", depth);
  }

  function theme(color, depth = null) {
    return `theme("colors.${color}${depth ? `.${depth}` : ""}")`;
  }
};
