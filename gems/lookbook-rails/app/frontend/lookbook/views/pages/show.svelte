<script>
  import Page from "@components/page";

  let { page, content } = $props();
</script>

<Page {page}>
  {@html content}
</Page>
