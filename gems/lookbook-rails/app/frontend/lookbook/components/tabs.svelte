<script>
  import { Tabs } from "@ark-ui/svelte/tabs";
  import { getAppState } from "@lib/utils";

  import Toolbar from "@components/toolbar";

  let { id, panels = [], label, panel } = $props();

  let app = getAppState();
  let tabsState = app.getTabsState(() => id);

  if (!tabsState.active) {
    // svelte-ignore state_referenced_locally
    tabsState.active = panels[0]?.id;
  }
</script>

<Tabs.Root defaultValue={panels[0]?.id} bind:value={tabsState.active} data-component="tabs">
  <Toolbar data-role="tabs:toolbar">
    {#snippet start()}
      <Tabs.List data-role="tabs:list">
        {#each panels as p (p.id)}
          <Tabs.Trigger value={p.id} data-role="tabs:trigger">
            <span data-role="tabs:label" class="label">
              <span>
                {#if label}
                  {@render label(p)}
                {:else}
                  {p.label}
                {/if}
              </span>
            </span>
          </Tabs.Trigger>
        {/each}
      </Tabs.List>
    {/snippet}
  </Toolbar>

  {#each panels as p (p.id)}
    <Tabs.Content value={p.id} data-role="tabs:panel">
      {@render panel(p)}
    </Tabs.Content>
  {/each}
</Tabs.Root>

<style>
  :global [data-component="tabs"] {
    --tab-bg: tranparent;
    --tab-fg: var(--lookbook-fg);
    --tab-fg-active: var(--lookbook-accent);
    --tab-label-font-size: var(--lookbook-font-size-2xs);
    --tab-border: transparent;
    --tab-border-hover: var(--lookbook-block-bg-hover);
    --tab-border-active: var(--lookbook-accent);
    --tab-padding: var(--lookbook-space-lg);

    display: grid;
    grid-template-rows: min-content 1fr;
    height: 100%;
    overflow: hidden;

    [data-role="tabs:toolbar"] {
      align-items: stretch;
      border-block-end: 1px solid var(--lookbook-panel-border);
    }

    [data-role="tabs:list"] {
      display: flex;
      position: relative;
      isolation: isolate;
      gap: 0;
      height: 100%;
      align-items: stretch;
    }

    [data-role="tabs:trigger"] {
      padding: 0 var(--tab-padding);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      user-select: none;
      border-block-start: 2px solid transparent;
      border-block-end: 2px solid transparent;

      &:hover {
        border-bottom-color: var(--tab-border-hover);
      }

      &[data-selected] {
        border-bottom-color: var(--tab-border-active);
      }

      &[data-disabled] {
        opacity: 0.5;
        cursor: not-allowed;
        filter: grayscale(100%);
      }
    }

    [data-role="tabs:label"] {
      font-size: var(--tab-label-font-size);
    }

    [data-role="tabs:panel"] {
      height: 100%;
      overflow: hidden;
    }
  }
</style>
