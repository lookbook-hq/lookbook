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
  [data-component="toolbar"] {
    --toolbar-padding: var(--lookbook-space-base);

    display: flex;
    align-items: center;
    /*padding-inline: var(--toolbar-padding);*/
    height: var(--lookbook-size-lg);

    [data-role="toolbar:start"],
    [data-role="toolbar:end"] {
      display: flex;
      align-items: center;
      /*column-gap: var(--lookbook-space-xs);*/
    }

    [data-role="toolbar:start"] {
      margin-right: auto;
    }

    [data-role="toolbar:end"] {
      margin-left: auto;

      /*:global .button {
        position: relative;
        left: var(--lookbook-space-xs);
      }*/
    }
  }
</style>
