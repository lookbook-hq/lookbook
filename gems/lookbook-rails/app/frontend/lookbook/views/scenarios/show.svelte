<script>
  import Inspector from "@components/inspector";
  import { getCurrentContext } from "@lib/utils";

  let { ...data } = $props();
  const collection = getCurrentContext().collection;
</script>

<Inspector {collection} {...data}></Inspector>
