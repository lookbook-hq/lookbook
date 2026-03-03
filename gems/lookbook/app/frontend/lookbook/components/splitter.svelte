<script>
  import { Splitter } from "@ark-ui/svelte/splitter";
  import { PersistedState } from "runed";

  let { id, defaultSize, panels, orientation = "horizontal", ...panelSnippets } = $props();

  const createSplitterState = () =>
    new PersistedState(`splitter:${id}`, {
      orientation,
      size: [],
    });

  let splitterState = createSplitterState();
</script>

<div data-component="splitter">
  <Splitter.Root
    {defaultSize}
    {panels}
    bind:orientation={splitterState.current.orientation}
    bind:size={splitterState.current.size}
    data-role="splitter:root"
  >
    {#each panels as panel, index (panel)}
      {#if index > 0}
        <Splitter.ResizeTrigger
          id={`${panels[index - 1].id}:${panel.id}`}
          aria-label="Resize"
          data-role="splitter:resize-trigger"
        ></Splitter.ResizeTrigger>
      {/if}
      <Splitter.Panel id={panel.id} data-role="splitter:panel">
        {@render panelSnippets[panel.id]?.()}
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
        width: var(--lookbook-grid-gap);
        cursor: row-resize;
      }
    }
  }
</style>
