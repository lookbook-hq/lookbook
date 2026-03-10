<script>
  import { getAppState, toRelativeSize, toAbsoluteSize } from "@lib/utils";

  import Tabs from "@components/tabs";
  import Button from "@components/button";
  import Toolbar from "@components/toolbar";
  import Splitter from "@components/splitter";
  import Viewport from "@components/viewport";
  import Breadcrumb from "@components/breadcrumb";
  import ButtonGroup from "@components/button-group";
  import InspectorPanel from "@components/inspector-panel";

  import { PanelBottomCloseIcon, PanelRightCloseIcon } from "lucide-svelte";

  let { scenario, panels, preview, ancestors } = $props();

  let maxWidth = $state();
  let maxHeight = $state();

  let app = getAppState();
  let crumbs = $derived.by(() => [...ancestors, scenario]);

  // Main

  let mainPanels = [{ id: "previewPane" }, { id: "drawerPane" }];
  let drawer = $derived.by(() => app.inspector.drawer);
  let drawerTabs = $derived.by(() => panels?.drawer || []);

  const mainSplit = $derived.by(() => {
    const drawerHeight = drawer.height ? toRelativeSize(drawer.height, maxHeight) : 40;
    return [100 - drawerHeight, drawerHeight];
  });

  function setDrawerHeight(relativeHeight) {
    if (relativeHeight) {
      drawer.height = toAbsoluteSize(relativeHeight, maxHeight);
    }
  }

  // Preview

  let previewPanels = [{ id: "viewportPane" }, { id: "sidebarPane" }];
  let sidebar = $derived.by(() => app.inspector.sidebar);
  let sidebarTabs = $derived.by(() => panels?.sidebar || []);

  const previewSplit = $derived.by(() => {
    const sidebarWidth = sidebar.width ? toRelativeSize(sidebar.width, maxWidth) : 25;
    return [100 - sidebarWidth, sidebarWidth];
  });

  function setSidebarWidth(relativeWidth) {
    if (relativeWidth) {
      sidebar.width = toAbsoluteSize(relativeWidth, maxWidth);
    }
  }
</script>

<div id="inspector" bind:offsetWidth={maxWidth} bind:offsetHeight={maxHeight}>
  <div data-role="inspector:toolbar">
    <Toolbar>
      {#snippet start()}
        <Breadcrumb data-role="inspector:breadcrumb" {crumbs}></Breadcrumb>
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
      orientation={drawer.orientation}
      panels={mainPanels}
      bind:size={() => mainSplit, (sizes) => setDrawerHeight(sizes[1])}
    >
      {#snippet panel(panel)}
        <InspectorPanel {...panel}></InspectorPanel>
      {/snippet}

      {#snippet previewPane()}
        <Splitter
          orientation={sidebar.orientation}
          panels={previewPanels}
          bind:size={() => previewSplit, (sizes) => setSidebarWidth(sizes[1])}
        >
          {#snippet viewportPane()}
            <div data-role="inspector:panel">
              <Viewport {...preview}></Viewport>
            </div>
          {/snippet}

          {#snippet sidebarPane()}
            <div data-role="inspector:panel">
              <Tabs id="inspector-sidebar-tabs" panels={sidebarTabs} {panel}></Tabs>
            </div>
          {/snippet}
        </Splitter>
      {/snippet}

      {#snippet drawerPane()}
        <div data-role="inspector:panel">
          <Tabs id="inspector-drawer-tabs" panels={drawerTabs} {panel}></Tabs>
        </div>
      {/snippet}
    </Splitter>
  </div>
</div>

<style>
  :global #inspector {
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
      background-color: var(--inspector-panel-bg);
      color: var(--inspector-panel-fg);
      border: 1px solid var(--inspector-panel-border-color);
      height: 100%;
    }
  }
</style>
