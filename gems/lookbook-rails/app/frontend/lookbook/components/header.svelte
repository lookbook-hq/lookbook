<script>
  import { Link } from "@inertiajs/svelte";

  let { project, lookbook } = $props();
</script>

<header data-component="header">
  <Link href={lookbook.urlPath} data-role="header:branding">
    <span>{project.name}</span>
  </Link>
</header>

<style>
  :global [data-component="header"] {
    --header-height: var(--lookbook-size-11);
    --header-branding-fg: var(--lookbook-accent);
    --header-branding-font-size: var(--lookbook-font-size-md);
    --header-padding: var(--lookbook-space-md);
    --header-bg: var(--lookbook-panel-bg);
    --header-fg: var(--lookbook-panel-fg);
    --header-border-color: var(--lookbook-panel-border);

    background-color: var(--header-bg);
    color: var(--header-fg);
    border-block-end: 1px solid var(--header-border-color);
    height: var(--header-height);
    padding: 0 var(--header-padding);

    display: flex;
    align-items: center;

    [data-role="header:branding"] {
      color: var(--header-branding-fg);
      font-size: var(--header-branding-font-size);
      font-weight: 700;
      display: inline-flex;
      text-transform: uppercase;
      letter-spacing: 0.02em;
    }
  }
</style>
