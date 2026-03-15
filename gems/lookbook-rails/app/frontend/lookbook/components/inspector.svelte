<script>
  import { PersistedState } from "runed";
  import { toRelativeSize, toAbsoluteSize } from "@lib/utils";

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

  let crumbs = $derived.by(() => [...ancestors, scenario]);
  let inspector = new PersistedState("inspector", {
    drawer: {
      orientation: "vertical",
      height: 300,
      activeTab: panels?.drawer?.[0].id,
    },

    sidebar: {
      orientation: "horizontal",
      width: 300,
      activeTab: panels?.sidebar?.[0].id,
    },
  });

  // Main

  let mainPanels = [{ id: "previewPane" }, { id: "drawerPane" }];
  let drawerTabs = $derived.by(() => panels?.drawer || []);

  const mainSplit = $derived.by(() => {
    const drawerHeight = inspector.current.drawer.height
      ? toRelativeSize(inspector.current.drawer.height, maxHeight)
      : 40;
    return [100 - drawerHeight, drawerHeight];
  });

  function setDrawerHeight(relativeHeight) {
    if (relativeHeight) {
      inspector.current.drawer.height = toAbsoluteSize(relativeHeight, maxHeight);
    }
  }

  // Preview

  let previewPanels = [{ id: "viewportPane" }, { id: "sidebarPane" }];
  let sidebarTabs = $derived.by(() => panels?.sidebar || []);

  const previewSplit = $derived.by(() => {
    const sidebarWidth = inspector.current.sidebar.width
      ? toRelativeSize(inspector.current.sidebar.width, maxWidth)
      : 25;
    return [100 - sidebarWidth, sidebarWidth];
  });

  function setSidebarWidth(relativeWidth) {
    if (relativeWidth) {
      inspector.current.sidebar.width = toAbsoluteSize(relativeWidth, maxWidth);
    }
  }
</script>

<div id="inspector" bind:offsetWidth={maxWidth} bind:offsetHeight={maxHeight}>
  <div data-role="inspector:toolbar">
    <Toolbar variant="transparent">
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
      orientation={inspector.current.drawer.orientation}
      panels={mainPanels}
      bind:size={() => mainSplit, (sizes) => setDrawerHeight(sizes[1])}
    >
      {#snippet panel(panel)}
        <InspectorPanel {...panel}></InspectorPanel>
      {/snippet}

      {#snippet previewPane()}
        <Splitter
          orientation={inspector.current.sidebar.orientation}
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
              <Tabs
                id="inspector-sidebar-tabs"
                panels={sidebarTabs}
                {panel}
                bind:active={inspector.current.sidebar.activeTab}
              ></Tabs>
            </div>
          {/snippet}
        </Splitter>
      {/snippet}

      {#snippet drawerPane()}
        <div data-role="inspector:panel">
          <Tabs
            id="inspector-drawer-tabs"
            panels={drawerTabs}
            {panel}
            bind:active={inspector.current.drawer.activeTab}
          ></Tabs>
        </div>
      {/snippet}
    </Splitter>
  </div>
</div>

<style>
  :global #inspector {
    --inspector-panel-padding: var(--lookbook-space-md);
    --inspector-panel-bg: var(--lookbook-panel-bg);
    --inspector-panel-fg: var(--lookbook-panel-fg);
    --inspector-panel-font-size: var(--lookbook-font-size-sm);
    --inspector-panel-border-color: var(--lookbook-panel-border);
    --inspector-toolbar-padding: var(--lookbook-space-sm);

    font-size: var(--inspector-panel-font-size);
    display: grid;
    grid-template-rows: min-content 1fr;
    height: 100%;
    overflow: hidden;
    padding-bottom: var(--lookbook-space-md);

    [data-role="inspector:breadcrumb"] {
      display: inline-block;
    }

    [data-role="inspector:panel"] {
      background-color: var(--inspector-panel-bg);
      color: var(--inspector-panel-fg);
      border: 1px solid var(--inspector-panel-border-color);
      height: 100%;
    }
  }
</style>
