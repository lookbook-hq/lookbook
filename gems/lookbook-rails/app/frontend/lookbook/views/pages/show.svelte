<script>
  import Page from "@components/page";

  let { page, content, ancestors } = $props();
</script>

<Page {page} {ancestors}>
  {@html content}
</Page>
