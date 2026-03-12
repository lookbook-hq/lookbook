<script>
  import { Switch } from "@ark-ui/svelte/switch";

  let { name, label, checked = $bindable() } = $props();
</script>

<Switch.Root data-component="switch" value="true" bind:checked>
  <Switch.Label data-role="switch:label">
    {label}
  </Switch.Label>
  <Switch.Control data-role="switch:control">
    <Switch.Thumb data-role="switch:thumb" />
  </Switch.Control>
  <Switch.HiddenInput {name} data-role="switch:hidden-input" />
</Switch.Root>

<style>
  :global [data-component="switch"] {
    --switch-bg: var(--lookbook-panel-bg);
    --switch-bg-active: var(--lookbook-accent);
    --switch-fg: var(--lookbook-panel-fg);
    --switch-gap: var(--lookbook-space-sm);

    color: var(--switch-fg);
    gap: var(--switch-gap);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    position: relative;

    &[data-disabled] {
      opacity: 0.5;
      filter: grayscale(100%);
    }

    [data-role="switch:control"] {
      background: var(--switch-bg);
      display: inline-flex;
      align-items: center;
      flex-shrink: 0;
      width: 2.5rem;
      height: 1.5rem;
      padding: 0.125rem;
      border-radius: 9999px;
      transition:
        background-color 0.05s ease,
        box-shadow 0.05s ease;

      &[data-state="checked"] {
        background: var(--switch-bg-active);
      }

      &[data-focus-visible] {
        outline: 2px solid var(--lookbook-focus-ring);
        outline-offset: -2px;
      }
    }

    [data-role="switch:thumb"] {
      background: var(--switch-bg);
      box-shadow: var(--lookbook-shadow-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.25rem;
      height: 1.25rem;
      border-radius: 9999px;
      transition: transform 0.15s ease;

      &[data-state="checked"] {
        transform: translateX(1rem);
      }
    }

    [data-role="switch:label"] {
      display: inline-block;
      font-weight: bold;
    }
  }
</style>
