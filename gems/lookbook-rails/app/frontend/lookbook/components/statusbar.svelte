<script>
  // import { Link } from "@inertiajs/svelte";
  // import Popover from "@components/popover";
  // import Issues from "@components/issues";

  let { lookbook, project, collections } = $props();

  // let issueCount = $derived.by(() => {
  //   return collections.reduce(function (prev, cur) {
  //     return prev + cur.issues.length;
  //   }, 0);
  // });
</script>

<footer data-component="statusbar" class="surface">
  <div data-role="statusbar:section statusbar:section-start">
    <!-- <Popover>
      {#snippet trigger(triggerProps)}
        <button {...triggerProps}>⚠ Issues ({issueCount})</button>
      {/snippet}
      {#each collections as collection}
        <Issues
          title={`${collection.label} (${collection.issues.length})`}
          issues={collection.issues}
        ></Issues>
      {/each}
    </Popover> -->
  </div>
  <div data-role="statusbar:section statusbar:section-end">
    <span data-role="statusbar:label"
      >LOOKBOOK_v<em data-role="statusbar:version">{lookbook.version}</em></span
    >
  </div>
</footer>

<style>
  [data-component="statusbar"] {
    --statusbar-height: var(--lookbook-size-8);
    --statusbar-font-size: var(--lookbook-font-size-2xs);
    --statusbar-padding: var(--lookbook-space-md);
    --statusbar-bg: var(--lookbook-panel-bg);
    --statusbar-fg: var(--lookbook-panel-fg);
    /*--statusbar-fg-hover: var(--lookbook-neutral-text-contrast);*/
    --statusbar-border-color: var(--lookbook-panel-border);

    background-color: var(--statusbar-bg);
    color: var(--statusbar-fg);
    border-block-start: 1px solid var(--statusbar-border-color);
    height: var(--statusbar-height);
    padding: 0 var(--statusbar-padding);

    display: flex;
    align-items: center;
    column-gap: var(--lookbook-space-sm);
    height: var(--statusbar-height);
    padding-inline: var(--statusbar-padding);

    font-size: var(--statusbar-font-size);

    [data-role~="statusbar:section"] {
      display: flex;
      align-items: center;
      column-gap: var(--lookbook-space-sm);
    }

    [data-role~="statusbar:section-start"] {
      margin-right: auto;
    }

    [data-role~="statusbar:section-end"] {
      margin-left: auto;
    }

    [data-role="statusbar:label"] {
      color: var(--statusbar-fg);
      transition: color var(--lookbook-duration-fast) ease-in;

      &:hover {
        color: var(--statusbar-fg-hover);
      }
    }

    [data-role="statusbar:version"] {
      font-style: regular;
    }
  }
</style>
