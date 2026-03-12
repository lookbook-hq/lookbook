<script>
  import { setContext, onDestroy, onMount } from "svelte";
  import { router } from "@inertiajs/svelte";

  import { ServerEventsListener } from "@lib/sse-listener";
  import { appState } from "@lib/app-state";

  import Header from "@components/header";
  import StatusBar from "@components/statusbar";
  import Workbench from "@components/workbench";

  let {
    request,
    project,
    lookbook,
    collections,
    children,
    collectionId = null,
    resourceId = null,
  } = $props();

  const current = $derived.by(() => {
    return {
      request,
      collectionId,
      resourceId,
      collection: collections.find((c) => c.id === collectionId),
    };
  });

  setContext("current", () => current);
  setContext("appState", () => appState);

  // Listen for update events

  let updateRequested = $state(false);

  onMount(() => {
    const serverEventsListener = new ServerEventsListener(lookbook.ssePath);
    serverEventsListener.on("update", () => (updateRequested = true));
    serverEventsListener.start();

    onDestroy(() => serverEventsListener.stop());
  });

  $effect(() => {
    if (updateRequested) {
      router.reload({ headers: { "X-Lookbook-Refresh": "true" } });
      updateRequested = false;
    }
  });
</script>

<div id="app">
  <Header {lookbook} {project}></Header>
  <Workbench {collections} {children}></Workbench>
  <StatusBar {project} {lookbook} {collections}></StatusBar>
</div>

<style>
  #app {
    --app-grid-marker-fill: var(--lookbook-panel-border);
    --app-grid-marker-spacing: var(--lookbook-size-6);
    --app-grid-marker-offset: calc((var(--app-grid-marker-spacing) / 2) * -1);

    position: relative;
    height: 100dvh;

    display: grid;
    grid-template-rows: min-content 1fr min-content;
    overflow: hidden;

    background-image: radial-gradient(var(--app-grid-marker-fill) 1px, transparent 1px);
    background-size: var(--app-grid-marker-spacing) var(--app-grid-marker-spacing);
    background-position: var(--app-grid-marker-offset) var(--app-grid-marker-offset);
  }
</style>
