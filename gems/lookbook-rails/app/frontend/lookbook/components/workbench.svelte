<script>
  import { PersistedState } from "runed";
  import { toRelativeSize, toAbsoluteSize } from "@lib/utils";

  import Sidebar from "@components/sidebar";
  import Splitter from "@components/splitter";

  let { collections, children } = $props();

  let panels = [{ id: "sidebar" }, { id: "main" }];
  let maxWidth = $state();

  let workbench = new PersistedState("workbench", {
    sidebar: {
      orientation: "horizontal",
      width: 300,
    },
  });

  const split = $derived.by(() => {
    const sidebarWidth = toRelativeSize(workbench.current.sidebar.width, maxWidth);
    return [sidebarWidth, 100 - sidebarWidth];
  });

  function setSidebarWidth(relativeWidth) {
    if (relativeWidth) {
      workbench.current.sidebar.width = toAbsoluteSize(relativeWidth, maxWidth);
    }
  }
</script>

<div id="workbench" bind:offsetWidth={maxWidth}>
  <Splitter
    {panels}
    defaultSize={split}
    bind:size={() => split, (sizes) => setSidebarWidth(sizes[0])}
    data-role="workbench:sidebar"
  >
    {#snippet sidebar()}
      <Sidebar {collections} />
    {/snippet}

    {#snippet main()}
      <div data-role="workbench:main">
        {@render children()}
      </div>
    {/snippet}
  </Splitter>
</div>

<style>
  #workbench {
    height: 100%;
    overflow: hidden;

    [data-role="workbench:main"] {
      padding-inline-end: var(--lookbook-space-md);
      height: 100%;
      overflow: hidden;
    }
  }
</style>
