<script>
  import "@styles/highlight/github-light-default";
  import "@styles/highlight/github-light-high-contrast";
  import "@styles/highlight/github-dark-default";
  import "@styles/highlight/github-dark-dimmed";
  import "@styles/highlight/github-dark-high-contrast";

  import "@styles/highlight/min-light";
  import "@styles/highlight/min-dark";

  import "@styles/highlight/one-light";
  import "@styles/highlight/one-dark";

  let { children, theme = "min-light", output = false } = $props();
</script>

<svelte:element
  this={output ? "output" : "div"}
  data-component="snippet"
  role="region"
  aria-live="polite"
  aria-roledescription="code block"
>
  <code data-role="snippet:code" data-theme={theme}>
    <pre>{@render children()}</pre>
  </code>
</svelte:element>

<style>
  :global [data-component="snippet"] {
    --snippet-line-height: 1.4rem;
    --snippet-padding: var(--lookbook-space-md);

    view-transition-name: snippet;
    padding: var(--snippet-padding);

    code[data-theme] {
      display: block;
      line-height: var(--snippet-line-height);

      background: var(--snippet-bg);
      color: var(--snippet-fg);

      .hll {
        background-color: var(--snippet-highlight-line);
      }
      .c {
        color: var(--snippet-comment);
      }
      .err {
        color: var(--snippet-error);
      }
      .esc {
        color: var(--snippet-escape);
      }
      .k {
        color: var(--snippet-keyword);
      }
      .l {
        color: var(--snippet-literal);
      }
      .o {
        color: var(--snippet-operator);
      }
      .ch {
        color: var(--snippet-comment-hashbang);
      }
      .cm {
        color: var(--snippet-comment-multiline);
      }
      .cp {
        color: var(--snippet-comment-preproc);
      }
      .cpf {
        color: var(--snippet-comment-preproc-file);
      }
      .c1 {
        color: var(--snippet-comment-single);
      }
      .cs {
        color: var(--snippet-comment-special);
      }
      .gd {
        color: var(--snippet-generic-deleted);
      }
      .ge {
        color: var(--snippet-generic-emph);
        font-style: italic;
      }
      .ges {
        color: var(--snippet-generic-emph-strong);
        font-weight: bold;
        font-style: italic;
      }
      .gr {
        color: var(--snippet-generic-error);
      }
      .gh {
        color: var(--snippet-generic-heading);
        font-weight: bold;
      }
      .gi {
        color: var(--snippet-generic-inserted);
      }
      .go {
        color: var(--snippet-generic-output);
      }
      .gp {
        color: var(--snippet-generic-prompt);
      }
      .gs {
        color: var(--snippet-generic-strong);
        font-weight: bold;
      }
      .gu {
        color: var(--snippet-generic-subheading);
      }
      .gt {
        color: var(--snippet-generic-traceback);
      }
      .kc {
        color: var(--snippet-keyword-constant);
      }
      .kd {
        color: var(--snippet-keyword-declaration);
      }
      .kn {
        color: var(--snippet-keyword-namespace);
      }
      .kp {
        color: var(--snippet-keyword-pseudo);
      }
      .kr {
        color: var(--snippet-keyword-reserved);
      }
      .kt {
        color: var(--snippet-keyword-type);
      }
      .ld {
        color: var(--snippet-literal-date);
      }
      .m {
        color: var(--snippet-literal-number);
      }
      .s {
        color: var(--snippet-literal-string);
      }
      .na {
        color: var(--snippet-name-attribute);
      }
      .nb {
        color: var(--snippet-name-builtin);
      }
      .nc {
        color: var(--snippet-name-class);
      }
      .no {
        color: var(--snippet-name-constant);
      }
      .nd {
        color: var(--snippet-name-decorator);
      }
      .ni {
        color: var(--snippet-name-entity);
      }
      .ne {
        color: var(--snippet-name-exception);
      }
      .nf {
        color: var(--snippet-name-function);
      }
      .nl {
        color: var(--snippet-name-label);
      }
      .py {
        color: var(--snippet-name-property);
      }
      .nt {
        color: var(--snippet-name-tag);
      }
      .ow {
        color: var(--snippet-operator-word);
      }
      .w {
        color: var(--snippet-text-whitespace);
      }
      .mb {
        color: var(--snippet-literal-number-bin);
      }
      .mf {
        color: var(--snippet-literal-number-float);
      }
      .mh {
        color: var(--snippet-literal-number-hex);
      }
      .mi {
        color: var(--snippet-literal-number-integer);
      }
      .mo {
        color: var(--snippet-literal-number-oct);
      }
      .sa {
        color: var(--snippet-literal-string-affix);
      }
      .sb {
        color: var(--snippet-literal-string-backtick);
      }
      .sc {
        color: var(--snippet-literal-string-char);
      }
      .dl {
        color: var(--snippet-literal-string-delimiter);
      }
      .sd {
        color: var(--snippet-literal-string-doc);
      }
      .s2 {
        color: var(--snippet-literal-string-double);
      }
      .se {
        color: var(--snippet-literal-string-escape);
      }
      .sh {
        color: var(--snippet-literal-string-heredoc);
      }
      .si {
        color: var(--snippet-literal-string-interpol);
      }
      .sx {
        color: var(--snippet-literal-string-other);
      }
      .sr {
        color: var(--snippet-literal-string-regex);
      }
      .s1 {
        color: var(--snippet-literal-string-single);
      }
      .ss {
        color: var(--snippet-literal-string-symbol);
      }
      .bp {
        color: var(--snippet-name-builtin-pseudo);
      }
      .fm {
        color: var(--snippet-name-function-magic);
      }
      .vc {
        color: var(--snippet-name-variable-class);
      }
      .il {
        color: var(--snippet-literal-number-integer-long);
      }
    }
  }

  :root::view-transition-old(snippet) {
    animation: 0.1s ease-in both fade-out;
  }

  :root::view-transition-new(snippet) {
    animation: 0.1s ease-in both fade-in;
  }
</style>
