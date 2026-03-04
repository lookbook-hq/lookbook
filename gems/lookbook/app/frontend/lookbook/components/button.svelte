<script>
  import { inertia } from "@inertiajs/svelte";
  import Icon from "@components/icon";

  let { icon, children, href, size = "md" } = $props();
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
  [data-component="button"] {
    /*--button-border: var(--lookbook-neutral-5);
    --button-border-hover: var(--lookbook-brand-5);*/
    --button-padding: var(--lookbook-size-2);
    --button-spacing: var(--lookbook-space-xs);
    --button-height: var(--lookbook-size-7);
    /*--button-bg: var(--lookbook-neutral-base);*/
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
    /*border: 1px solid var(--button-border);*/
    border-radius: 4px;

    transition:
      color 150ms ease-in,
      background-color 150ms ease-in;

    [data-role="button:content"] {
      display: inline-flex;
      align-items: center;
      column-gap: var(--button-spacing);
    }

    &[data-size="md"] [data-role="button:content"] {
      margin: 0 -2px;
    }

    &[data-size="lg"] [data-role="button:content"] {
      margin: 0 -3px;
    }

    &:hover {
      background-color: var(--button-bg-hover);
      color: var(--button-fg-hover);
    }
  }
</style>
