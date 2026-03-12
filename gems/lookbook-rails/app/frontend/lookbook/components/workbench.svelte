<script>
  import { getAppState, toRelativeSize, toAbsoluteSize } from "@lib/utils";

  import Sidebar from "@components/sidebar";
  import Splitter from "@components/splitter";

  let { collections, children } = $props();

  let panels = [{ id: "sidebar" }, { id: "main" }];
  let maxWidth = $state();

  let app = getAppState();
  let sidebar = $derived.by(() => app.workbench.sidebar);

  const split = $derived.by(() => {
    const sidebarWidth = toRelativeSize(sidebar.width, maxWidth);
    return [sidebarWidth, 100 - sidebarWidth];
  });

  function setSidebarWidth(relativeWidth) {
    if (relativeWidth) {
      sidebar.width = toAbsoluteSize(relativeWidth, maxWidth);
    }
  }
</script>

<div id="workbench" bind:offsetWidth={maxWidth}>
  <Splitter
    {panels}
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
      padding-block-end: var(--lookbook-space-md);
      height: 100%;
      overflow: hidden;
    }
  }
</style>
