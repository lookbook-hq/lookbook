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
              {#if label}
                {@render label(p)}
              {:else}
                {p.label}
              {/if}
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
    --tabs-bg: var(--lookbook-panel-bg);
    --tabs-fg: var(--lookbook-panel-fg);
    --tabs-gap: var(0);

    --tabs-tab-bg: var(--lookbook-panel-bg);
    --tabs-tab-fg: var(--lookbook-panel-fg);
    --tabs-tab-fg-hover: var(--lookbook-accent);
    --tabs-tab-fg-active: var(--lookbook-accent);
    --tabs-tab-label-size: var(--lookbook-font-size-xs);
    --tabs-tab-marker: transparent;
    --tabs-tab-marker-hover: var(--lookbook-block-bg-hover);
    --tabs-tab-marker-active: var(--lookbook-accent);
    --tabs-tab-padding: var(--lookbook-space-md);

    background-color: var(--tabs-bg);
    color: var(--tabs-fg);
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
      gap: var(--tabs-gap);
      height: 100%;
      align-items: stretch;
    }

    [data-role="tabs:trigger"] {
      padding: 0 var(--tabs-tab-padding);
      background-color: var(--tabs-tab-bg);
      color: var(--tabs-tab-fg);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      user-select: none;
      border-block-start: 2px solid transparent;
      border-block-end: 2px solid transparent;
      transition: border-color var(--lookbook-duration-fast) ease-in;

      [data-role="tabs:label"] {
        font-size: var(--tabs-tab-label-size);
        color: var(--tabs-tab-fg);
        transition: color var(--lookbook-duration-fast) ease-in;
      }

      &:hover {
        color: var(--tabs-tab-fg-hover);
        border-bottom-color: var(--tabs-tab-marker-hover);

        [data-role="tabs:label"] {
          color: var(--tabs-tab-fg-hover);
        }
      }

      &[data-selected] {
        border-bottom-color: var(--tabs-tab-marker-active);

        [data-role="tabs:label"] {
          color: var(--tabs-tab-fg-active);
        }
      }

      &[data-disabled] {
        opacity: 0.5;
        cursor: not-allowed;
        filter: grayscale(100%);
      }
    }

    [data-role="tabs:panel"] {
      height: 100%;
      overflow: hidden;
    }
  }
</style>
