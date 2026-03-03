<script>
  import { page } from "@inertiajs/svelte";

  let { collectionId, spec } = $props();
  let collection = $derived.by(() =>
    $page.props.collections.find((c) => c.id === collectionId)
  );
</script>

<p>{collection.label}</p>
<div>spec</div>
