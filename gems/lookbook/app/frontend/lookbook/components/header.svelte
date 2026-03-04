<script>
  import { Link } from "@inertiajs/svelte";

  let { project, lookbook } = $props();
</script>

<header data-component="header">
  <Link href={lookbook.urlPath} class="mark green" data-role="header:branding">
    <span>{project.name}</span>
  </Link>
</header>

<style>
  :global [data-component="header"] {
    --header-height: var(--lookbook-size-xl);
    --header-branding-font-size: var(--lookbook-font-size-base);
    --header-padding: var(--lookbook-space-base);
    --header-bg: var(--lookbook-surface-bg);
    --header-fg: var(--lookbook-surface-fg);
    --header-border-color: var(--lookbook-divider-color);

    background-color: var(--header-bg);
    color: var(--header-fg);
    border-block-end: 1px solid var(--header-border-color);
    height: var(--header-height);
    padding: 0 var(--header-padding);

    display: flex;
    align-items: center;

    .highlight {
      outline-offset: 1px;
    }

    [data-role="header:branding"] {
      font-size: var(--header-branding-font-size);
      font-weight: 500;
      display: inline-flex;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  }
</style>
