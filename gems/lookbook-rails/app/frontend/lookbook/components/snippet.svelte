<script>
  let { children, theme = "github-light", output = false } = $props();
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
  }

  :root::view-transition-old(snippet) {
    animation: 0.1s ease-in both fade-out;
  }

  :root::view-transition-new(snippet) {
    animation: 0.1s ease-in both fade-in;
  }
</style>
