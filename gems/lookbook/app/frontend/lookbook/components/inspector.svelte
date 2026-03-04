<script>
  import Toolbar from "@components/toolbar";
  import Button from "@components/button";
  import ButtonGroup from "@components/button-group";
  import Splitter from "@components/splitter";
  import { PanelBottomCloseIcon, PanelRightCloseIcon } from "lucide-svelte";

  let { spec, scenario } = $props();
</script>

<div data-component="inspector">
  <div data-role="inspector:toolbar">
    <Toolbar>
      {#snippet start()}
        <h4 data-role="inspector:breadcrumb" class="label">Elements / Button / Themes</h4>
      {/snippet}
      {#snippet end()}
        <ButtonGroup size="lg">
          <Button icon={PanelBottomCloseIcon}></Button>
          <Button icon={PanelRightCloseIcon}></Button>
        </ButtonGroup>
      {/snippet}
    </Toolbar>
  </div>
  <div data-role="inspector:panels">
    <Splitter
      panels={[{ id: "top" }, { id: "bottom" }]}
      orientation="vertical"
      defaultSize={[65, 35]}
    >
      {#snippet top()}
        <Splitter
          panels={[{ id: "start" }, { id: "end" }]}
          orientation="horizontal"
          defaultSize={[70, 30]}
        >
          {#snippet start()}
            <div data-role="inspector:panel">start</div>
          {/snippet}
          {#snippet end()}
            <div data-role="inspector:panel">end</div>
          {/snippet}
        </Splitter>
      {/snippet}
      {#snippet bottom()}
        <div data-role="inspector:panel">bottom</div>
      {/snippet}
    </Splitter>
  </div>
</div>

<style>
  :global [data-component="inspector"] {
    --inspector-panel-padding: var(--lookbook-space-base);
    --inspector-panel-bg: var(--lookbook-surface-bg);
    --inspector-panel-fg: var(--lookbook-surface-fg);
    --inspector-panel-font-size: var(--lookbook-font-size-sm);
    --inspector-panel-border-color: var(--lookbook-divider-color);

    display: grid;
    grid-template-rows: min-content 1fr;
    height: 100%;
    overflow: hidden;
    font-size: var(--inspector-panel-font-size);

    [data-role="inspector:toolbar"] {
      padding-inline-start: var(--lookbook-space-sm);
      font-size: var(--lookbook-font-size-xs);

      [data-role="toolbar:end"] {
        background-color: var(--lookbook-neutral-bg-subtle);
        box-shadow: 0px 0px 4px 6px var(--lookbook-neutral-bg-subtle);
      }
    }

    [data-role="inspector:breadcrumb"] {
      display: inline-block;
      background-color: var(--lookbook-neutral-bg-subtle);
      box-shadow: 0px 0px 4px 12px var(--lookbook-neutral-bg-subtle);
    }

    [data-role="inspector:panel"] {
      padding: var(--inspector-panel-padding);
      background-color: var(--inspector-panel-bg);
      color: var(--inspector-panel-fg);
      border: 1px solid var(--inspector-panel-border-color);
      height: 100%;
    }
  }
</style>
