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
    --switch-bg: var(--lookbook-neutral-5);
    --switch-border: var(--lookbook-neutral-6);
    --switch-bg-active: var(--lookbook-accent);
    --switch-thumb-bg: var(--lookbook-panel-bg);
    --switch-bg-active: var(--lookbook-accent);
    --switch-fg: var(--lookbook-panel-fg);
    --switch-label-font-size: var(--lookbook-font-size-xs);
    --switch-gap: var(--lookbook-space-md);

    --switch-height: 1.6rem;
    --switch-width: 0.8;

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

    [data-role="switch:label"] {
      font-size: var(--switch-label-font-size);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      font-weight: 500;
    }

    [data-role="switch:control"] {
      background-color: var(--switch-bg);
      height: var(--switch-height);
      width: calc(var(--switch-height) * calc(1 + var(--switch-width)));
      border: 0;
      border-radius: 100em;
      display: inline-block;

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
      content: "";
      display: block;
      aspect-ratio: 1;
      background-color: white;
      border: 2px solid var(--switch-border);
      height: 100%;
      border-radius: 50%;
      transition: translate var(--lookbook-duration-fast) ease;

      &[data-state="checked"] {
        border-color: var(--switch-bg-active);
        translate: calc(var(--switch-height) * var(--switch-width)) 0;
      }
    }
  }
</style>
