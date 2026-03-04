<script>
  const { svg: IconSvg = null, size = "md", ...props } = $props();

  const defaultProps = {
    size: 16,
    strokeWidth: 1.5,
    // absoluteStrokeWidth: true,
  };
</script>

{#if IconSvg}
  <i data-component="icon" data-size={size} class="icon">
    <IconSvg {...defaultProps} {...props} />
  </i>
{/if}

<style>
  :global [data-component="icon"] {
    --icon-size-sm: var(--lookbook-size-3);
    --icon-size-md: var(--lookbook-size-4);
    --icon-size-lg: calc((var(--lookbook-size-5) + var(--lookbook-size-4)) / 2);

    display: block;
    color: currentColor;

    svg {
      display: block;
      width: 100%;
      height: 100%;
      stroke: currentColor;
    }

    &[data-size="sm"] {
      width: var(--icon-size-sm);
      height: var(--icon-size-sm);
    }

    &[data-size="md"] {
      width: var(--icon-size-md);
      height: var(--icon-size-md);
    }

    &[data-size="lg"] {
      width: var(--icon-size-lg);
      height: var(--icon-size-lg);
    }
  }
</style>
