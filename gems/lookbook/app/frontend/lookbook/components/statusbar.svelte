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
    --statusbar-height: var(--lookbook-size-xl);
    --statusbar-branding-font-size: var(--lookbook-font-size-base);
    --statusbar-padding: var(--lookbook-space-base);
    --statusbar-bg: var(--lookbook-surface-bg);
    --statusbar-fg: var(--lookbook-neutral-text-muted);
    --statusbar-fg-hover: var(--lookbook-neutral-text-contrast);
    --statusbar-border-color: var(--lookbook-divider-color);

    background-color: var(--statusbar-bg);
    color: var(--statusbar-fg);
    border-block-start: 1px solid var(--statusbar-border-color);
    height: var(--statusbar-height);
    padding: 0 var(--statusbar-padding);

    display: flex;
    align-items: center;
    column-gap: var(--lookbook-space-sm);
    height: var(--lookbook-size-md);
    padding-inline: var(--statusbar-padding);

    font-size: var(--lookbook-font-size-xs);

    [data-role~="statusbar:section"] {
      display: flex;
      align-items: center;
      column-gap: 1rem;
    }

    [data-role~="statusbar:section-start"] {
      margin-right: auto;
    }

    [data-role~="statusbar:section-end"] {
      margin-left: auto;
    }

    [data-role="statusbar:label"] {
      color: var(--statusbar-fg);
      letter-spacing: 0.075em;
      transition: color 150ms ease-in;

      &:hover {
        color: var(--statusbar-fg-hover);
      }
    }

    [data-role="statusbar:version"] {
      letter-spacing: 0;
      font-style: regular;
    }
  }
</style>
