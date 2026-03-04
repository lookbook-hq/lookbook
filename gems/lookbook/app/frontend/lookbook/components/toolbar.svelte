<script>
  let { start, end } = $props();
</script>

<div data-component="toolbar">
  {#if start}
    <div data-role="toolbar:start">
      {@render start()}
    </div>
  {/if}
  {#if end}
    <div data-role="toolbar:end">
      {@render end()}
    </div>
  {/if}
</div>

<style>
  :global [data-component="toolbar"] {
    --toolbar-height: var(--lookbook-size-lg);
    --toolbar-padding: var(--lookbook-space-sm);
    --toolbar-border-color: var(--lookbook-divider-color);

    height: var(--toolbar-height);
    display: flex;
    align-items: center;

    .label {
      font-size: var(--lookbook-font-size-xs);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    [data-role="toolbar:start"],
    [data-role="toolbar:end"] {
      display: flex;
      align-items: center;
    }

    [data-role="toolbar:start"] {
      margin-right: auto;
    }

    [data-role="toolbar:end"] {
      margin-left: auto;
    }

    [data-component="button-group"] + [data-component="button-group"] {
      border-inline-start: 1px solid var(--toolbar-border-color);
      padding-inline-start: var(--toolbar-padding);
      margin-inline-start: var(--toolbar-padding);
    }
  }
</style>
