<script>
  import Toolbar from "@components/toolbar";
  import Button from "@components/button";
  import Splitter from "@components/splitter";
  import { PanelBottomCloseIcon, PanelRightCloseIcon } from "lucide-svelte";

  let { spec, scenario } = $props();
</script>

<div data-component="inspector">
  <div data-role="inspector:toolbar">
    <Toolbar>
      {#snippet start()}
        <h4 data-role="inspector:breadcrumb">Elements / Button / Themes</h4>
      {/snippet}
      {#snippet end()}
        <Button icon={PanelBottomCloseIcon} size="lg"></Button>
        <Button icon={PanelRightCloseIcon} size="lg"></Button>
      {/snippet}
    </Toolbar>
  </div>
  <div data-role="inspector:panels">
    <Splitter panels={[{ id: "top" }, { id: "bottom" }]} orientation="vertical">
      {#snippet top()}
        <Splitter panels={[{ id: "start" }, { id: "end" }]} orientation="horizontal">
          {#snippet start()}
            <div data-role="inspector:panel">start</div>
          {/snippet}
          {#snippet end()}
            <div data-role="inspector:panel">end</div>
          {/snippet}
        </Splitter>
      {/snippet}
      {#snippet bottom()}
        <div data-role="inspector:panel" style:border-bottom="0">bottom</div>
      {/snippet}
    </Splitter>
  </div>
</div>

<style>
  :global [data-component="inspector"] {
    --inspector-padding: var(--lookbook-space-base);
    --inspector-bg: var(--lookbook-surface-bg);
    --inspector-fg: var(--lookbook-surface-fg);
    --inspector-border-color: var(--lookbook-divider-color);

    display: grid;
    grid-template-rows: min-content 1fr;
    height: 100%;
    overflow: hidden;

    [data-role="inspector:toolbar"] {
      /*background-color: var(--lookbook-neutral-base);
      padding-inline: var(--lookbook-space-sm) var(--lookbook-space-xs);*/

      /*&::before {
        border: none !important;
      }*/
    }

    [data-role="inspector:breadcrumb"] {
      display: inline-block;
      padding-block: var(--lookbook-space-xs);
      padding-inline: var(--lookbook-space-sm);
      background-color: var(--lookbook-neutral-bg-subtle);
      font-size: var(--lookbook-font-size-sm);
    }

    [data-role="inspector:panel"] {
      padding: var(--inspector-padding);
      background-color: var(--inspector-bg);
      color: var(--inspector-fg);
      border: 1px solid var(--inspector-border-color);
      height: 100%;
    }
  }
</style>
