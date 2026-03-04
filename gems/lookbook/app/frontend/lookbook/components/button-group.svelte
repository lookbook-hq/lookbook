<script>
  import { inertia } from "@inertiajs/svelte";

  let { children, size = "md" } = $props();
</script>

<div data-component="button-group" data-size={size}>
  {@render children()}
</div>

<style>
  :global [data-component="button-group"] {
    display: flex;
    align-items: center;

    &[data-size="md"] .icon {
      --icon-size: var(--lookbook-icon-size-md);
    }

    &[data-size="lg"] .icon {
      --icon-size: var(--lookbook-icon-size-lg);
    }
  }
</style>
