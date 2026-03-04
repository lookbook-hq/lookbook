<script>
  import { PersistedState } from "runed";
  import { Accordion } from "@ark-ui/svelte/accordion";
  import { ChevronDownIcon } from "lucide-svelte";
  import Icon from "@components/icon";

  let { items, itemIndicator, itemLabel, itemContent } = $props();

  const sidebarState = new PersistedState(`sidebar`, {
    expandedSections: [],
  });

  let expandedItems = $derived.by(() => items.map((i) => i.id));
</script>

<div data-component="accordion">
  <Accordion.Root multiple bind:value={expandedItems}>
    {#each items as item (item.id)}
      <Accordion.Item value={item.id}>
        <Accordion.ItemTrigger>
          {#if itemLabel}
            {@render itemLabel(item)}
          {:else}
            {item.label}
          {/if}
          <Accordion.ItemIndicator>
            {#if itemIndicator}
              {@render itemIndicator(item)}
            {:else}
              <Icon svg={ChevronDownIcon} />
            {/if}
          </Accordion.ItemIndicator>
        </Accordion.ItemTrigger>
        <Accordion.ItemContent>
          {@render itemContent(item)}
        </Accordion.ItemContent>
      </Accordion.Item>
    {/each}
  </Accordion.Root>
</div>

<style>
  :global [data-scope="accordion"] {
    &[data-part="item"] {
      overflow-anchor: none;
      display: block;
    }

    &[data-part="item-trigger"] {
      width: 100%;
      padding-inline: var(--lookbook-space-base);
      padding-block: var(--lookbook-space-sm);

      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--lookbook-grid-gap);

      font-size: var(--lookbook-font-size-sm);
      cursor: pointer;

      border-block-end: 1px solid var(--lookbook-divider-color);
    }

    &[data-part="item-indicator"] {
      display: block;

      transition: rotate 200ms ease;
      transform-origin: center;
      rotate: 180deg;

      &[data-state="open"] {
        rotate: 0deg;
      }
    }

    &[data-part="item-content"] {
      overflow: hidden;

      &[data-state="open"] {
        animation-duration: 100ms;
        animation-timing-function: ease-out;
        animation-name: expand-height, fade-in;
      }

      &[data-state="closed"] {
        animation-duration: 100ms;
        animation-timing-function: ease-out;
        animation-name: collapse-height, fade-out;
      }
    }
  }
</style>
