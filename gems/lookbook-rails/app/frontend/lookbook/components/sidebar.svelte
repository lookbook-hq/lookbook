<script>
  import { PersistedState } from "runed";
  import { Link } from "@inertiajs/svelte";
  import { ListFilterIcon } from "lucide-svelte";
  import Toolbar from "@components/toolbar";
  import Button from "@components/button";
  import Splitter from "@components/splitter";
  import NavTree from "@components/nav-tree";

  let { collections } = $props();

  const sidebarState = new PersistedState(`sidebar`, {
    expandedSections: [],
  });

  let panels = $derived.by(() =>
    collections.map((collection) => ({ id: `collection-${collection.id}` }))
  );
</script>

<div data-component="sidebar">
  <Splitter
    id="app-layout"
    orientation="vertical"
    defaultSize={collections.map((c) => 100 / collections.length)}
    panels={collections}
  >
    {#snippet panel(collection)}
      <section
        data-role="sidebar:section"
        style:border-top-width={collection === collections[0] ? "0" : "1px"}
      >
        <header data-role="sidebar:section-header">
          <Toolbar>
            {#snippet label()}
              <h3 class="label">
                <Link href={collection.href}>{collection.label}</Link>
              </h3>
            {/snippet}
            {#snippet end()}
              <Button icon={ListFilterIcon}></Button>
            {/snippet}
          </Toolbar>
        </header>
        <div data-role="sidebar:section-content">
          <NavTree id={collection.id} tree={collection.nav}></NavTree>
        </div>
      </section>
    {/snippet}
  </Splitter>
</div>

<style>
  :global [data-component="sidebar"] {
    --sidebar-padding: var(--lookbook-space-sm);
    --sidebar-bg: var(--lookbook-panel-bg);
    --sidebar-fg: var(--lookbook-panel-fg);
    --sidebar-border-color: var(--lookbook-panel-border);

    background-color: var(--sidebar-bg);
    color: var(--sidebar-fg);
    border-inline-end: 1px solid var(--sidebar-border-color);

    height: 100%;
    font-size: var(--lookbook-font-size-sm);
    display: grid;
    grid-template-rows: auto;
    row-gap: var(--lookbook-space-md);

    [data-role="sidebar:section"] {
      height: 100%;
      border-block-start: 0 solid var(--sidebar-border-color);
    }

    [data-role="sidebar:section-header"] {
      border-block-end: 1px solid var(--lookbook-panel-border);
    }

    [data-role="sidebar:section-content"] {
      padding-block: var(--sidebar-padding);
    }
  }
</style>
