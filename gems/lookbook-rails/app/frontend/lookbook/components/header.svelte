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
    --header-branding-font-size: var(--lookbook-font-size-md);
    --header-padding: var(--lookbook-space-md);
    --header-bg: var(--lookbook-panel-bg);
    --header-fg: var(--lookbook-panel-fg);
    --header-border-color: var(--lookbook-panel-border);

    background-color: var(--header-bg);
    box-sizing: border-box;
    color: var(--header-fg);
    border-block-end: 1px solid var(--header-border-color);
    height: var(--header-height);
    padding: 0 var(--header-padding);

    display: flex;
    align-items: center;

    [data-role="header:branding"] {
      font-size: var(--header-branding-font-size);
      font-weight: 500;
      display: inline-flex;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
  }
</style>
