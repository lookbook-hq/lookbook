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
    cursor: pointer;
    color: var(--lookbook-neutral-fg);
    display: inline-flex;
    align-items: center;
    gap: var(--lookbook-space-sm);
    position: relative;

    &[data-disabled] {
      opacity: 0.5;
      filter: grayscale(100%);
    }

    [data-role="switch:control"] {
      display: inline-flex;
      align-items: center;
      flex-shrink: 0;
      width: 2.5rem;
      height: 1.5rem;
      padding: 0.125rem;
      background: var(--lookbook-neutral-5);
      border-radius: 9999px;

      transition:
        background-color 0.05s ease,
        box-shadow 0.05s ease;

      &[data-state="checked"] {
        background: var(--lookbook-accent);
      }

      &[data-focus-visible] {
        outline: var(--lookbook-focus-ring-size) solid var(--lookbook-focus-ring-color);
        outline-offset: var(--lookbook-focus-ring-size);
      }
    }

    [data-role="switch:thumb"] {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.25rem;
      height: 1.25rem;
      background: var(--lookbook-neutral-1);
      border-radius: 9999px;
      box-shadow: var(--lookbook-shadow-sm);
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
