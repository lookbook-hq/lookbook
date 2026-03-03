<script>
  import { Link } from "@inertiajs/svelte";

  let { project, lookbook } = $props();
</script>

<header data-component="header" class="surface">
  <Link href={lookbook.urlPath} class="highlight branding caps">
    <span data-role="header:branding">{project.name}</span>
  </Link>
</header>

<style>
  :global [data-component="header"] {
    --header-height: var(--lookbook-size-xl);
    --header-branding-font-size: var(--lookbook-font-size-base);
    --header-padding: var(--lookbook-space-base);

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
    }
  }
</style>
