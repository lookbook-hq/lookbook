module.exports = {
  content: [
    "./app/views/**/*.html.erb",
    "./app/components/**/*.css",
    "./app/components/**/*.html.erb",
    "./app/components/**/*.rb",
    "./app/components/**/*.js",
    "./app/assets/**/*.js",
    "./app/controllers/**/*.rb",
    "./test/components/**/*.rb",
    "./test/components/**/*.html.erb",
  ],
  theme: {
    extend: {
      colors: {
        lookbook: {
          text: "var(--lookbook-text)",
          divider: "var(--lookbook-divider)",
          button: {
            text: "var(--lookbook-button-text)",
            "text-hover": "var(--lookbook-button-text--hover)",
          },
          branding: {
            text: "var(--lookbook-branding-text)",
          },
          draggable: {
            hint: "var(--lookbook-draggable-hint)",
          },
          scrollbar: {
            thumb: "var(--lookbook-scrollbar-thumb)",
            "thumb-hover": "var(--lookbook-scrollbar-thumb--hover)",
          },
          tooltip: {
            bg: "var(--lookbook-tooltip-bg)",
            text: "var(--lookbook-tooltip-text)",
          },
          sidebar: {
            bg: "var(--lookbook-sidebar-bg)",
          },
          nav: {
            text: "var(--lookbook-nav-text)",
            chevron: "var(--lookbook-nav-chevron)",
            icon: "var(--lookbook-nav-icon)",
            "item-bg-hover": "var(--lookbook-nav-item-bg--hover)",
            "item-bg-active": "var(--lookbook-nav-item-bg--active)",
          },
          toolbar: {
            bg: "var(--lookbook-toolbar-bg)",
            divider: "var(--lookbook-toolbar-divider)",
          },
          drawer: {
            bg: "var(--lookbook-drawer-bg)",
          },
          prose: {
            bg: "var(--lookbook-prose-bg)",
            text: "var(--lookbook-prose-text)",
            link: "var(--lookbook-prose-link)",
          },
          viewport: {
            handle: "var(--lookbook-viewport-handle)",
            "handle-icon": "var(--lookbook-viewport-handle-icon)",
            "handle-icon-hover": "var(--lookbook-viewport-handle-icon--hover)",
          },
          tabs: {
            "active-highlight": "var(--lookbook-tabs-active-highlight)",
            text: "var(--lookbook-tabs-text)",
            "text-hover": "var(--lookbook-tabs-text--hover)",
            "text-disabled": "var(--lookbook-tabs-text--disabled)",
          },
          input: {
            bg: "var(--lookbook-input-bg)",
            border: "var(--lookbook-input-border)",
            "border-focus": "var(--lookbook-input-border--focus)",
            text: "var(--lookbook-input-text)",
            "text-placeholder": "var(--lookbook-input-text--placeholder)",
          },
          toggle: {
            bg: "var(--lookbook-toggle-bg)",
            "bg-active": "var(--lookbook-toggle-bg--active)",
          },
          page: {
            bg: "var(--lookbook-page-bg)",
          },
        },
      },
      fontFamily: {
        mono: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
        sans: '"Nunito Sans", -apple-system, ".SFNSText-Regular", "San Francisco", BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif',
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
