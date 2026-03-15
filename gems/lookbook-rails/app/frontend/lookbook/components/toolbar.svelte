<script>
  let { label, start, end, variant = "default", ...attrs } = $props();
</script>

<div data-component="toolbar" data-variant={variant} {...attrs}>
  {#if start || label}
    <div data-role="toolbar:start">
      {#if label}
        <div data-role="toolbar:label">
          {@render label()}
        </div>
      {/if}

      {@render start?.()}
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
    --toolbar-bg: var(--lookbook-panel-bg);
    --toolbar-fg: var(--lookbook-panel-fg);
    --toolbar-height: var(--lookbook-size-10);
    --toolbar-padding: var(--lookbook-space-sm);
    --toolbar-border: var(--lookbook-panel-border);
    --toolbar-label-font-size: var(--lookbook-font-size-xs);

    background-color: var(--toolbar-bg);
    color: var(--toolbar-fg);
    height: var(--toolbar-height);
    box-sizing: content-box;
    display: flex;
    align-items: center;

    &[data-variant="transparent"] {
      --toolbar-padding: 0;
      --toolbar-bg: transparent;
    }

    .label {
      font-size: var(--toolbar-label-font-size);
      color: var(--toolbar-fg);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    [data-role="toolbar:start"],
    [data-role="toolbar:end"] {
      display: flex;
      align-items: center;
    }

    [data-role="toolbar:start"] {
      margin-inline-end: auto;
      padding-inline-start: var(--toolbar-padding);

      & > [data-role="tabs:list"]:first-child {
        margin-inline-start: calc(var(--toolbar-padding) * -1);
      }

      [data-role="toolbar:label"]:first-child {
        padding-inline-start: calc((var(--toolbar-padding) / 2));
      }
    }

    [data-role="toolbar:end"] {
      margin-inline-start: auto;

      padding-inline-end: var(--toolbar-padding);
    }

    [data-component="button-group"] + [data-component="button-group"] {
      border-inline-start: 1px solid var(--toolbar-border);
      padding-inline-start: var(--toolbar-padding);
      margin-inline-start: var(--toolbar-padding);
    }
  }
</style>
