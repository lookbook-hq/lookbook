<script>
  import { inertia } from "@inertiajs/svelte";
  import Icon from "@components/icon";

  let { icon, children, href, size } = $props();
</script>

<svelte:element
  this={href ? "a" : "button"}
  use:inertia
  data-component="button"
  class="button"
  data-size={size}
>
  <span data-role="button:content">
    {#if icon}
      <Icon svg={icon} {size} />
    {/if}
    {@render children?.()}
  </span>
</svelte:element>

<style>
  :global [data-component="button"] {
    --button-padding: var(--lookbook-space-sm);
    --button-spacing: var(--lookbook-space-xs);
    --button-height: var(--lookbook-size-7);

    --button-bg: transparent;
    /*--button-bg-hover: var(--lookbook-neutral-11);*/
    --button-fg: var(--lookbook-neutral-11);
    /*--button-fg-hover: var(--lookbook-brand-text-contrast);*/

    display: inline-flex;
    align-items: stretch;

    padding-inline: var(--button-padding);
    height: var(--button-height);
    background-color: var(--button-bg);
    color: var(--button-fg);
    border-radius: var(--lookbook-radius-sm);

    transition:
      color var(--lookbook-duration-fast) ease-in,
      background-color var(--lookbook-duration-fast) ease-in;

    [data-role="button:content"] {
      display: inline-flex;
      align-items: center;
      column-gap: var(--button-spacing);
      margin: 0 calc((var(--lookbook-space-xs) / 2) * -1);
    }

    &[data-size="md"],
    [data-component="button-group"][data-size="md"] & {
      [data-role="button:content"] {
        margin: 0 calc((var(--lookbook-space-xs) / 2) * -1);
      }
    }

    &[data-size="lg"],
    [data-component="button-group"][data-size="lg"] & {
      [data-role="button:content"] {
        margin: 0 calc((var(--lookbook-space-xs) * 3 / 4) * -1);
      }
    }

    &:hover {
      background-color: var(--button-bg-hover);
      color: color-mix(in oklab, var(--icon-stroke), black 50%);
    }
  }
</style>
