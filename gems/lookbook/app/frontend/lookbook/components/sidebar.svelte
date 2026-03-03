<script>
  import { PersistedState } from "runed";
  import { Link } from "@inertiajs/svelte";
  import Accordion from "@components/accordion";
  // import { ChevronDownIcon } from "lucide-svelte";
  // import NavTree from "@components/nav-tree";

  import Icon from "@components/icon";

  let { collections } = $props();

  // const sidebarState = new PersistedState(`sidebar`, {
  //   expandedSections: [],
  // });
</script>

<div data-component="sidebar" class="surface">
  <Accordion items={collections}>
    {#snippet itemLabel(collection)}
      <div data-role="sidebar:section-label">{collection.label}</div>
    {/snippet}
    {#snippet itemContent(collection)}
      <div>{collection.label} nav</div>
    {/snippet}
  </Accordion>
</div>

<!-- <Accordion.Root multiple bind:value={sidebarState.current.expandedSections}>
    {#each collections as collection (collection.id)}
      <Accordion.Item value={collection.id}>
        <Accordion.ItemTrigger>
          <Accordion.ItemIndicator>
            <ChevronDownIcon />
          </Accordion.ItemIndicator>
          <span>{collection.label}</span>
        </Accordion.ItemTrigger>
        <Accordion.ItemContent>
          <section data-role="sidebar:section">
            <h3 data-role="sidebar:section-title">
              {collection.label}
              <Link href={collection.href}>(link)</Link>
            </h3>
            <NavTree
              id={collection.id}
              tree={collection.nav}
              data-scope="sidebar"
              data-part="nav-tree"
            ></NavTree>
          </section>
        </Accordion.ItemContent>
      </Accordion.Item>
    {/each}
  </Accordion.Root> -->

<style>
  :global [data-component="sidebar"] {
    height: 100%;
    font-size: var(--lookbook-font-size-sm);

    [data-role="sidebar:section"] {
    }
  }
</style>
