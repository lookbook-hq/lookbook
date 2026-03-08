<script>
  import { getContext } from "svelte";
  import { PersistedState } from "runed";
  import { Link } from "@inertiajs/svelte";
  import { createTreeCollection } from "@ark-ui/svelte/collection";
  import { TreeView } from "@ark-ui/svelte/tree-view";
  import { useFilter } from "@ark-ui/svelte/locale";
  import { getCurrentContext } from "@lib/utils";
  import {
    ChevronRightIcon,
    FileIcon,
    FolderIcon,
    FolderOpenIcon,
    Layers2Icon,
    SquareDashedMousePointerIcon,
  } from "lucide-svelte";
  import Icon from "@components/icon";

  const iconMap = {
    page: FileIcon,
    scenario: SquareDashedMousePointerIcon,
    spec: Layers2Icon,
    folder: FolderIcon,
    folderOpen: FolderOpenIcon,
  };

  const filterFn = useFilter({ sensitivity: "base" });

  let { id, tree } = $props();

  const initialCollection = $derived.by(() =>
    createTreeCollection({
      nodeToValue: (node) => node.id,
      nodeToString: (node) => node.label,
      rootNode: tree,
    })
  );

  let collection = $derived.by(() => initialCollection);
  let branchIds = $derived.by(() => collection.getBranchValues());

  const createNavTreeState = () => {
    const state = new PersistedState(`nav-tree:${id}`, {
      expandedItems: [],
      filter: "",
      selected: [],
    });

    return {
      get expandedItems() {
        return state.current.expandedItems;
      },

      set expandedItems(value) {
        state.current.expandedItems = value;
      },

      get filter() {
        return state.current.filter;
      },

      set filter(value) {
        state.current.filter = value;
      },

      get selected() {
        return state.current.selected;
      },

      set selected(value) {
        value = Array.isArray(value) ? value : [value];
        if (!branchIds.includes(value[0])) {
          state.current.selected = value;
        }
      },
    };
  };

  let navTreeState = createNavTreeState();
  navTreeState.selected = [getCurrentContext().resourceId];

  const filter = (value) => {
    const filtered =
      value.length > 0
        ? initialCollection.filter((node) => filterFn().contains(node.label, value))
        : initialCollection;
    collection = filtered;
    navTreeState.filter = value;
  };

  filter(navTreeState.filter);
</script>

<div data-component="nav-tree">
  <!-- <input
    data-role="nav-tree:filter"
    placeholder="Search"
    bind:value={() => navTreeState.filter, (value) => filter(value)}
  /> -->

  <TreeView.Root {collection} selectionMode="single" data-role="nav-tree:tree">
    <!-- bind:expandedValue={navTreeState.expandedItems}
    bind:selectedValue={navTreeState.selected} -->
    <TreeView.Tree>
      {#each collection.rootNode?.children ?? [] as node, index (node.id)}
        {@render renderNode(node, [index])}
      {/each}
    </TreeView.Tree>
  </TreeView.Root>

  {#snippet renderNode(node, indexPath)}
    <TreeView.NodeProvider {node} {indexPath}>
      <TreeView.NodeContext>
        {#snippet render(nodeState)}
          {#if node.leaf}
            <TreeView.Item data-role="nav-tree:item">
              {#snippet asChild(itemProps)}
                <Link href={node.href} {...itemProps()}>
                  <TreeView.ItemText data-role="nav-tree:item-text">
                    <Icon svg={iconMap[node.type] || SquareDashedMousePointerIcon} />

                    <span data-role="nav-tree:item-label">{node.label}</span>
                  </TreeView.ItemText>
                </Link>
              {/snippet}
            </TreeView.Item>
          {:else}
            <TreeView.Branch data-role="nav-tree:branch">
              <TreeView.BranchControl data-role="nav-tree:branch-control">
                <TreeView.BranchText data-role="nav-tree:branch-text">
                  {#if nodeState().expanded}
                    <Icon svg={iconMap["folderOpen"]} />
                  {:else}
                    <Icon svg={iconMap["folder"]} />
                  {/if}
                  <span data-role="nav-tree:branch-label">{node.label}</span>
                </TreeView.BranchText>
              </TreeView.BranchControl>
              <TreeView.BranchContent data-role="nav-tree:branch-content">
                <TreeView.BranchIndentGuide data-role="nav-tree:branch-indent-guide" />
                {#each node.children as child, index (child.id)}
                  {@render renderNode(child, [...indexPath, index])}
                {/each}
              </TreeView.BranchContent>
            </TreeView.Branch>
          {/if}
        {/snippet}
      </TreeView.NodeContext>
    </TreeView.NodeProvider>
  {/snippet}
</div>

<style>
  :global [data-component="nav-tree"] {
    [data-role="nav-tree:tree"] {
      color: var(--demo-neutral-fg);
      --tree-item-gap: var(--lookbook-grid-gap);
      --tree-indentation: 1rem;
      --tree-padding-inline: var(--lookbook-space-base);
      --tree-padding-block: var(--lookbook-space-xs);
      --tree-icon-size: 1rem;

      font-size: 13px;

      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;
    }

    [data-role="nav-tree:label"] {
      font-size: 0.875rem;
      line-height: 1.25rem;
      font-weight: 500;
      /*color: var(--demo-neutral-fg);*/
      user-select: none;
    }

    [data-role="nav-tree:tree"] {
      display: flex;
      flex-direction: column;
      line-height: 1.25rem;
      /*font-size: 0.875rem;
      line-height: 1.25rem;*/

      & svg {
        flex-shrink: 0;
      }
    }

    [data-role="nav-tree:branch"] {
      position: relative;
    }

    [data-role="nav-tree:branch-control"] {
      display: flex;
      align-items: center;
      gap: var(--tree-item-gap);
      /*border-radius: 0.375rem;*/
      user-select: none;
      position: relative;
      cursor: pointer;
      width: 100%;
      border: none;
      background: transparent;
      font: inherit;
      /*color: var(--demo-neutral-fg);*/
      text-align: start;

      --tree-depth: calc(var(--depth) - 1);
      --tree-indentation-offset: calc(var(--tree-indentation) * var(--tree-depth));
      --tree-icon-offset: calc(var(--tree-icon-size) * var(--tree-depth) * 0.5);
      --tree-offset: calc(
        var(--tree-padding-inline) + var(--tree-indentation-offset) + var(--tree-icon-offset)
      );

      padding-inline-start: var(--tree-offset);
      padding-inline-end: var(--tree-padding-inline);
      padding-block: var(--tree-padding-block);

      &:hover {
        /*background: var(--demo-neutral-subtle);*/
      }

      &:focus-visible {
        /*outline: 2px solid var(--demo-coral-focus-ring);*/
        /*outline-offset: -2px;*/
      }

      &[data-selected] {
        background: var(--lookbook-neutral-bg);
        /*color: var(--demo-coral-fg);*/
      }

      &[data-disabled] {
        opacity: 0.5;
        filter: grayscale(100%);
        cursor: not-allowed;
      }
    }

    [data-role="nav-tree:branch-content"] {
      position: relative;

      &[data-state="open"] {
        animation:
          expand-height 150ms ease-out,
          fade-in 150ms ease-out;
      }

      &[data-state="closed"] {
        animation:
          collapse-height 150ms ease-out,
          fade-out 150ms ease-out;
      }
    }

    [data-role="nav-tree:branch-indent-guide"] {
      height: 100%;
      width: 1px;
      background: var(--lookbook-divider-color);
      position: absolute;
      z-index: 1;

      --tree-depth: calc(var(--depth) - 1);
      --tree-indentation-offset: calc(var(--tree-indentation) * var(--tree-depth));
      --tree-offset: calc(var(--tree-padding-inline) + var(--tree-indentation-offset));
      --tree-icon-offset: calc(var(--tree-icon-size) * 0.5 * var(--depth));

      inset-inline-start: calc(var(--tree-offset) + var(--tree-icon-offset) - 1px);
    }

    [data-role="nav-tree:branch-indicator"] {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: var(--demo-neutral-emphasized);
      transform-origin: center;
      transition: transform 150ms ease;

      &[data-state="open"] {
        transform: rotate(90deg);
      }

      & svg {
        width: 0.875rem;
        height: 0.875rem;
      }
    }

    [data-role="nav-tree:branch-trigger"] {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    [data-role="nav-tree:branch-text"] {
      flex: 1;
      display: inline-flex;
      align-items: center;
      gap: var(--tree-item-gap);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    [data-role="nav-tree:item"] {
      display: flex;
      align-items: center;
      gap: var(--tree-item-gap);
      border-radius: 0.375rem;
      user-select: none;
      position: relative;
      cursor: pointer;
      width: 100%;
      border: none;
      background: transparent;
      font: inherit;
      /*color: var(--demo-neutral-fg);*/
      text-align: start;
      text-decoration: none;

      --tree-depth: calc(var(--depth) - 1);
      --tree-indentation-offset: calc(var(--tree-indentation) * var(--tree-depth));
      --tree-icon-offset: calc(var(--tree-icon-size) * var(--tree-depth) * 0.5);
      --tree-offset: calc(
        var(--tree-padding-inline) + var(--tree-indentation-offset) + var(--tree-icon-offset)
      );

      padding-inline-start: var(--tree-offset);
      padding-inline-end: var(--tree-padding-inline);
      padding-block: var(--tree-padding-block);

      &:hover {
        /*background: var(--demo-neutral-subtle);*/
      }

      &:focus-visible {
        /*outline: 2px solid var(--demo-coral-focus-ring);*/
        outline-offset: -2px;
      }

      &[data-selected] {
        background: var(--lookbook-neutral-bg);
        /*color: var(--demo-coral-fg);*/
      }

      &[data-disabled] {
        opacity: 0.5;
        filter: grayscale(100%);
        cursor: not-allowed;
      }
    }

    [data-role="nav-tree:item-indicator"] {
      display: flex;
      align-items: center;
      justify-content: center;
      /*color: var(--demo-coral-solid);*/
      flex-shrink: 0;

      & svg {
        width: 0.875rem;
        height: 0.875rem;
      }
    }

    [data-role="nav-tree:item-text"] {
      flex: 1;
      display: inline-flex;
      align-items: center;
      gap: var(--tree-item-gap);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
</style>
