<script>
  // import Prose from "@components/prose";

  let { page, content } = $props();
</script>

<h1>{page.label}</h1>

{@html content}
