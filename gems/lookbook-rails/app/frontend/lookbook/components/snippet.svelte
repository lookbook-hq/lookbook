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
  [data-component="snippet"] {
    view-transition-name: snippet;

    :global code[data-role="snippet:code"] {
      display: block;
      line-height: 1.4;

      background: var(--background);
      color: var(--foreground);

      .hll {
        background-color: var(--highlight-line);
      }
      .c {
        color: var(--comment);
      }
      .err {
        color: var(--error);
      }
      .esc {
        color: var(--escape);
      }
      .k {
        color: var(--keyword);
      }
      .l {
        color: var(--literal);
      }
      .o {
        color: var(--operator);
      }
      .ch {
        color: var(--comment-hashbang);
      }
      .cm {
        color: var(--comment-multiline);
      }
      .cp {
        color: var(--comment-preproc);
      }
      .cpf {
        color: var(--comment-preproc-file);
      }
      .c1 {
        color: var(--comment-single);
      }
      .cs {
        color: var(--comment-special);
      }
      .gd {
        color: var(--generic-deleted);
      }
      .ge {
        color: var(--generic-emph);
        font-style: italic;
      }
      .ges {
        color: var(--generic-emph-strong);
        font-weight: bold;
        font-style: italic;
      }
      .gr {
        color: var(--generic-error);
      }
      .gh {
        color: var(--generic-heading);
        font-weight: bold;
      }
      .gi {
        color: var(--generic-inserted);
      }
      .go {
        color: var(--generic-output);
      }
      .gp {
        color: var(--generic-prompt);
      }
      .gs {
        color: var(--generic-strong);
        font-weight: bold;
      }
      .gu {
        color: var(--generic-subheading);
      }
      .gt {
        color: var(--generic-traceback);
      }
      .kc {
        color: var(--keyword-constant);
      }
      .kd {
        color: var(--keyword-declaration);
      }
      .kn {
        color: var(--keyword-namespace);
      }
      .kp {
        color: var(--keyword-pseudo);
      }
      .kr {
        color: var(--keyword-reserved);
      }
      .kt {
        color: var(--keyword-type);
      }
      .ld {
        color: var(--literal-date);
      }
      .m {
        color: var(--literal-number);
      }
      .s {
        color: var(--literal-string);
      }
      .na {
        color: var(--name-attribute);
      }
      .nb {
        color: var(--name-builtin);
      }
      .nc {
        color: var(--name-class);
      }
      .no {
        color: var(--name-constant);
      }
      .nd {
        color: var(--name-decorator);
      }
      .ni {
        color: var(--name-entity);
      }
      .ne {
        color: var(--name-exception);
      }
      .nf {
        color: var(--name-function);
      }
      .nl {
        color: var(--name-label);
      }
      .py {
        color: var(--name-property);
      }
      .nt {
        color: var(--name-tag);
      }
      .ow {
        color: var(--operator-word);
      }
      .w {
        color: var(--text-whitespace);
      }
      .mb {
        color: var(--literal-number-bin);
      }
      .mf {
        color: var(--literal-number-float);
      }
      .mh {
        color: var(--literal-number-hex);
      }
      .mi {
        color: var(--literal-number-integer);
      }
      .mo {
        color: var(--literal-number-oct);
      }
      .sa {
        color: var(--literal-string-affix);
      }
      .sb {
        color: var(--literal-string-backtick);
      }
      .sc {
        color: var(--literal-string-char);
      }
      .dl {
        color: var(--literal-string-delimiter);
      }
      .sd {
        color: var(--literal-string-doc);
      }
      .s2 {
        color: var(--literal-string-double);
      }
      .se {
        color: var(--literal-string-escape);
      }
      .sh {
        color: var(--literal-string-heredoc);
      }
      .si {
        color: var(--literal-string-interpol);
      }
      .sx {
        color: var(--literal-string-other);
      }
      .sr {
        color: var(--literal-string-regex);
      }
      .s1 {
        color: var(--literal-string-single);
      }
      .ss {
        color: var(--literal-string-symbol);
      }
      .bp {
        color: var(--name-builtin-pseudo);
      }
      .fm {
        color: var(--name-function-magic);
      }
      .vc {
        color: var(--name-variable-class);
      }
      .il {
        color: var(--literal-number-integer-long);
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
