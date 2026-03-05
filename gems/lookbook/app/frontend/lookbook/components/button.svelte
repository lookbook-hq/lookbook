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
    {@render children()}
  </span>
</svelte:element>

<style>
  :global [data-component="button"] {
    --button-padding: var(--lookbook-size-2);
    --button-spacing: var(--lookbook-space-xs);
    --button-height: var(--lookbook-size-7);

    --button-bg: transparent;
    --button-bg-hover: var(--lookbook-neutral-bg);
    --button-fg: var(--lookbook-neutral-text);
    --button-fg-hover: var(--lookbook-brand-text-contrast);

    display: inline-flex;
    align-items: stretch;

    padding-inline: var(--button-padding);
    height: var(--button-height);
    background-color: var(--button-bg);
    color: var(--button-fg);
    border-radius: 4px;

    transition:
      color 150ms ease-in,
      background-color 150ms ease-in;

    [data-role="button:content"] {
      display: inline-flex;
      align-items: center;
      column-gap: var(--button-spacing);
      margin: 0 -2px;
    }

    &[data-size="md"],
    [data-component="button-group"][data-size="md"] & {
      [data-role="button:content"] {
        margin: 0 -2px;
      }
    }

    &[data-size="lg"],
    [data-component="button-group"][data-size="lg"] & {
      [data-role="button:content"] {
        margin: 0 -3px;
      }
    }

    &:hover {
      background-color: var(--button-bg-hover);
      color: color-mix(in oklab, var(--icon-stroke), black 50%);
    }
  }
</style>
