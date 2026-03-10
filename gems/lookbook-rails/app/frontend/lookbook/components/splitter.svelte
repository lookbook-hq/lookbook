<script>
  import { Splitter } from "@ark-ui/svelte/splitter";

  let {
    id,
    defaultSize,
    panels,
    size = $bindable(),
    orientation = $bindable("horizontal"),
    panel = null,
    ...panelSnippets
  } = $props();
</script>

<div data-component="splitter">
  <Splitter.Root {defaultSize} {panels} bind:orientation bind:size data-role="splitter:root">
    {#each panels as panelData, index (panelData.id)}
      {#if index > 0}
        <Splitter.ResizeTrigger
          id={`${panels[index - 1].id}:${panelData.id}`}
          aria-label="Resize"
          data-role="splitter:resize-trigger"
        ></Splitter.ResizeTrigger>
      {/if}
      <Splitter.Panel id={panelData.id} data-role="splitter:panel">
        {@const panelSnippet = panelSnippets[panelData.id]}
        {#if panelSnippet}
          {@render panelSnippet(panelData)}
        {:else}
          {@render panel(panelData)}
        {/if}
      </Splitter.Panel>
    {/each}
  </Splitter.Root>
</div>

<style>
  :global [data-component="splitter"] {
    height: 100%;
    width: 100%;

    [data-role="splitter:root"] {
      display: flex;
      height: 100%;
    }

    [data-role="splitter:panel"] {
      position: relative;
      box-shadow: 0 0 1px 4px
        color-mix(in oklab, var(--lookbook-neutral-bg-subtle), transparent 30%);
    }

    [data-role="splitter:resize-trigger"] {
      outline: 0;
      display: grid;

      position: relative;
      background-color: var(--lookbook-splitter-handle-bg);
      border: none;
      padding: 0;
      cursor: col-resize;
      transition: background-color 2500ms ease-in-out;

      &:hover {
        background-color: var(--lookbook-splitter-handle-bg-hover);
      }

      &[data-orientation="horizontal"] {
        height: 100%;
        width: var(--lookbook-grid-gap);
        cursor: col-resize;
      }

      &[data-orientation="vertical"] {
        width: 100%;
        height: var(--lookbook-grid-gap);
        cursor: row-resize;
      }
    }
  }
</style>
