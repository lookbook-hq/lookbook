module.exports = function (opts = {}) {
  const white = theme("white");

  return {
    white,

    "accent-50": accent(50),
    "accent-100": accent(100),
    "accent-200": accent(200),
    "accent-300": accent(300),
    "accent-400": accent(400),
    "accent-500": accent(500),
    "accent-600": accent(600),
    "accent-700": accent(700),
    "accent-800": accent(800),
    "accent-900": accent(900),

    "base-50": base(50),
    "base-100": base(100),
    "base-200": base(200),
    "base-300": base(300),
    "base-400": base(400),
    "base-500": base(500),
    "base-600": base(600),
    "base-700": base(700),
    "base-800": base(800),
    "base-900": base(900),

    text: "var(--lookbook-base-800)",
    divider: "var(--lookbook-base-300)",

    draggableHint: "rgb(224 231 255 / 0.2)",

    iconButtonStroke: "var(--lookbook-base-400)",
    iconButtonStrokeHover: "var(--lookbook-accent-600)",

    tooltipBg: "var(--lookbook-accent-500)",
    tooltipText: "var(--lookbook-white)",

    scrollbar: "var(--lookbook-base-200)",
    scrollbarHover: "var(--lookbook-base-300)",

    toolbarBg: "var(--lookbook-white)",
    toolbarDivider: "var(--lookbook-divider)",

    navText: "var(--lookbook-text)",
    navToggle: "var(--lookbook-base-500)",
    navIconStroke: "var(--lookbook-accent-500)",
    navItemHover: "var(--lookbook-base-100)",
    navItemActive: "var(--lookbook-accent-50)",

    inputBg: "var(--lookbook-white)",
    inputBorder: "var(--lookbook-base-300)",
    inputBorderFocus: "var(--lookbook-accent-200)",
    inputText: "var(--lookbook-base-600)",
    inputTextPlaceholder: "var(--lookbook-base-400)",
    inputToggle: "var(--lookbook-base-300)",
    inputToggleActive: "var(--lookbook-accent-500)",

    proseBg: "var(--lookbook-white)",
    proseText: "var(--lookbook-base-600)",
    proseLink: "var(--lookbook-accent-900)",

    tabsText: "var(--lookbook-base-500)",
    tabsTextHover: "var(--lookbook-base-700)",
    tabsTextDisabled: "var(--lookbook-base-300)",
    tabsBorderActive: "var(--lookbook-accent-400)",

    viewportHandle: "var(--lookbook-white)",
    viewportHandleHover: "var(--lookbook-draggable-hint)",
    viewportHandleIconStroke: "var(--lookbook-base-300)",
    viewportHandleIconStrokeHover: "var(--lookbook-base-700)",

    sidebarBg: "var(--lookbook-base-50)",
    pageBg: "var(--lookbook-white)",
    drawerBg: "var(--lookbook-base-50)",

    headerBg: "var(--lookbook-accent-600)",
    headerText: "var(--lookbook-white)",
    headerBorder: "var(--lookbook-accent-700)",

    blankSlateTitle: "var(--lookbook-accent-600)",

    brandingText: "var(--lookbook-header-text)",
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
