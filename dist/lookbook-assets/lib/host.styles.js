import"../chunks/chunk.KPKYWVQS.js";import{c as o}from"../chunks/chunk.SSXT3WVJ.js";import"../chunks/chunk.XPFMMO3L.js";var e=o`
      :host {
  box-sizing: border-box;
  color: var(--lookbook-text-body);
  font-weight: var(--lookbook-font-weight-normal);
  font-size: var(--lookbook-font-size-md);
  font-family: var(--lookbook-font-family);
  line-height: 1.1;
  text-rendering: optimizeLegibility;
  scrollbar-color: var(--lookbook-neutral-fill-mid) transparent;
  display: block;
}

:host *,
:host *::before,
:host *::after {
  box-sizing: border-box;
}

h1,
h2,
h3,
h4,
p,
ul,
ol {
  all: unset;
  display: revert;
  font-size: var(--lookbook-font-size-md);
}

ol,
ul,
menu {
  all: unset;
  display: revert;
  list-style: none;
}

input,
button,
textarea,
select {
  appearance: none;
  font-family: inherit;
  font-size: inherit;
}

a {
  text-decoration: none;
  color: currentColor;
}

[hidden] {
  display: none !important;
}

::selection {
  background-color: var(--lookbook-selection-background-color);
  color: var(--lookbook-selection-color);
  text-shadow: none !important;
}

/* Utilities */

.vh {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  white-space: nowrap;
  clip-path: inset(50%);
}

[divider] {
  border-style: solid;
  border-color: var(--lookbook-divider-color);
}

:host([divider="block-start"]) {
  border-block-start-width: var(--lookbook-border-width);
}

:host([divider="block-end"]) {
  border-block-end-width: var(--lookbook-border-width);
}

:host([divider="inline-start"]) {
  border-inline-start-width: var(--lookbook-border-width);
}

:host([divider="inline-end"]) {
  border-inline-end-width: var(--lookbook-border-width);
}

/* Components */

wa-split-panel {
  --divider-width: var(--lookbook-border-width);

  &::part(divider) {
    background-color: var(--lookbook-divider-color);
  }
}

    `;export{e as default};
