<script>
  import { Link } from "@inertiajs/svelte";

  let { crumbs = [] } = $props();
</script>

<nav data-component="breadcrumb">
  <ol data-role="breadcrumb:items">
    {#each crumbs as crumb (crumb.id)}
      <li data-role="breadcrumb:item">
        {#if crumb.href}
          <Link href={crumb.href}>{crumb.label}</Link>
        {:else}
          <span>{crumb.label}</span>
        {/if}
      </li>
    {/each}
  </ol>
</nav>

<style>
  :global [data-component="breadcrumb"] {
    --breadcrumb-fg: var(--lookbook-panel-fg);
    --breadcrumb-font-size: var(--lookbook-font-size-xs);

    [data-role="breadcrumb:items"] {
      display: flex;
      align-items: baseline;
      margin: 0;
      padding: 0;
      opacity: 0.7;
      color: var(--breadcrumb-fg);
    }

    [data-role="breadcrumb:item"] {
      flex: none;
      display: inline-flex;
      color: var(--breadcrumb-fg);
      font-size: var(--breadcrumb-font-size);

      &:not(:first-child) {
        margin-inline-start: var(--lookbook-space-sm);

        &:before {
          content: "/";
          display: inline-flex;
          position: relative;
          opacity: 0.7;
          left: calc((var(--lookbook-space-sm) / 2) * -1);
        }
      }

      a {
        transition: underline 250ms;
        color: var(--breadcrumb-fg);

        &:hover {
          text-decoration: underline;
          text-underline-offset: 3px;
        }
      }
    }
  }
</style>
