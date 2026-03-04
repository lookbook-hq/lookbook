<script>
  const { svg: IconSvg = null, size = "md", ...props } = $props();

  const defaultProps = {
    size: 16,
    strokeWidth: 1,
    absoluteStrokeWidth: true,
  };
</script>

{#if IconSvg}
  <i data-component="icon" data-size={size} class="icon">
    <IconSvg {...defaultProps} {...props} />
  </i>
{/if}

<style>
  :global [data-component="icon"] {
    --icon-size-sm: var(--lookbook-icon-size-sm);
    --icon-size-md: var(--lookbook-icon-size-md);
    --icon-size-lg: var(--lookbook-icon-size-lg);

    display: block;
    color: currentColor;
    aspect-ratio: 1 / 1;

    svg {
      display: block;
      width: 100%;
      height: 100%;
      stroke: currentColor;
    }

    &[data-size="sm"] {
      width: var(--icon-size, var(--icon-size-sm));
    }

    &[data-size="md"] {
      width: var(--icon-size, var(--icon-size-md));
    }

    &[data-size="lg"] {
      width: var(--icon-size, var(--icon-size-lg));
    }
  }
</style>
