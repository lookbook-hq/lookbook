<script>
  let { children, size = "md" } = $props();
</script>

<div data-component="prose" class="prose" data-size={size}>
  {@render children?.()}
</div>

<style>
  :global [data-component="prose"] {
    view-transition-name: prose;

    .prose {
      display: contents;
    }
  }

  :root::view-transition-old(prose) {
    animation: 0.1s ease-in both fade-out;
  }

  :root::view-transition-new(prose) {
    animation: 0.1s ease-in both fade-in;
  }
</style>
