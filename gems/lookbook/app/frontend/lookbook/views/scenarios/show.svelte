<script>
  import Inspector from "@components/inspector";
  import { getCurrentContext } from "@lib/utils";

  let { spec, scenario, panels, preview } = $props();
  const collection = getCurrentContext().collection;
</script>

<Inspector {collection} {spec} {scenario} {panels} {preview}></Inspector>
