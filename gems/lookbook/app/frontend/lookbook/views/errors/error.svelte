<script>
  let { status } = $props();
  const title = {
    503: "503: Service Unavailable",
    500: "500: Server Error",
    404: "404: Page Not Found",
    403: "403: Forbidden",
  };
</script>

<div>
  <h1>{title[status]}</h1>
</div>
