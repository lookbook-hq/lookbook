<script>
  import { PersistedState } from "runed";
  import { Link } from "@inertiajs/svelte";
  import { ListFilterIcon } from "lucide-svelte";
  import Toolbar from "@components/toolbar";
  import Button from "@components/button";
  import Splitter from "@components/splitter";
  import NavTree from "@components/nav-tree";

  // import Icon from "@components/icon";
  // import { ChevronDownIcon } from "lucide-svelte";

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
            {#snippet start()}
              <h3 data-role="sidebar:section-label" class="label">
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
    --sidebar-bg: var(--lookbook-surface-bg);
    --sidebar-fg: var(--lookbook-surface-fg);
    --sidebar-border-color: var(--lookbook-divider-color);

    background-color: var(--sidebar-bg);
    color: var(--sidebar-fg);
    border-inline-end: 1px solid var(--sidebar-border-color);

    height: 100%;
    font-size: var(--lookbook-font-size-sm);
    display: grid;
    height: 100%;
    grid-template-rows: auto;
    row-gap: var(--lookbook-grid-gap);

    [data-role="sidebar:section"] {
      height: 100%;
      border-block-start: 0 solid var(--sidebar-border-color);
    }

    [data-role="sidebar:section-header"] {
      border-block-end: 1px solid var(--lookbook-divider-color);
      padding-inline: var(--lookbook-space-base) var(--sidebar-padding);
    }

    [data-role="sidebar:section-label"] {
      font-size: 13px;
    }

    [data-role="sidebar:section-content"] {
      padding-block: var(--sidebar-padding);
    }
  }
</style>
