<script>
  import { Link } from "@inertiajs/svelte";

  let { crumbs = [] } = $props();
</script>

<nav data-component="breadcrumb">
  <ol data-role="breadcrumb:items">
    {#each crumbs as crumb (crumb.id)}
      <li data-role="breadcrumb:item" class="label">
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
    [data-role="breadcrumb:items"] {
      display: flex;
      align-items: baseline;
      margin: 0;
      padding: 0;
      opacity: 0.7;
    }

    [data-role="breadcrumb:item"] {
      flex: none;
      display: inline-flex;

      &:not(:first-child) {
        margin-inline-start: var(--lookbook-space-base);

        &:before {
          content: "/";
          display: inline-flex;
          position: relative;
          left: calc((var(--lookbook-space-base) / 2) * -1);
        }
      }

      a {
        &:hover {
          text-decoration: underline;
          text-underline-offset: 4px;
        }
      }
    }
  }
</style>
