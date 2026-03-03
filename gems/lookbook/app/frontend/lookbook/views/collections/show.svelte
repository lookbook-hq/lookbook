<script>
  import { getContext } from "svelte";

  let { collection } = $props();
</script>

<div>
  <h1><strong>{collection.label}</strong> collection</h1>
</div>
