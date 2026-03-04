<script>
  import { setContext, onDestroy, onMount } from "svelte";
  import { page, router } from "@inertiajs/svelte";
  import Header from "@components/header";
  import StatusBar from "@components/statusbar";
  import Sidebar from "@components/sidebar";
  import Splitter from "@components/splitter";
  import { ServerEventsListener } from "@lib/sse-listener";

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

  // Listen for update events

  let updateRequested = $state(false);

  onMount(() => {
    const serverEventsListener = new ServerEventsListener("/lookbook/events");
    serverEventsListener.on("update", () => (updateRequested = true));
    serverEventsListener.start();

    onDestroy(() => serverEventsListener.stop());
  });

  $effect(() => {
    if (updateRequested) {
      router.reload({
        headers: {
          "X-Lookbook-Refresh": "true",
        },
      });
      updateRequested = false;
    }
  });
</script>

<div id="app" data-component="app">
  <Header {lookbook} {project}></Header>

  <div data-role="app:body">
    <Splitter id="app-layout" panels={[{ id: "sidebar" }, { id: "main" }]} defaultSize={[30, 70]}>
      {#snippet sidebar()}
        <div data-role="app:sidebar">
          <Sidebar {collections} />
        </div>
      {/snippet}

      {#snippet main()}
        <main data-role="app:main">
          {@render children()}
        </main>
      {/snippet}
    </Splitter>
  </div>

  <div data-role="app:footer">
    <StatusBar {project} {lookbook} {collections}></StatusBar>
  </div>
</div>

<style>
  #app {
    --app-grid-marker-fill: var(--lookbook-neutral-8);
    --app-grid-marker-spacing: var(--lookbook-grid-spacing);
    --app-grid-marker-offset: calc((var(--app-grid-marker-spacing) / 2) * -1);

    position: relative;
    height: calc(100dvh);

    display: grid;
    grid-template-rows: min-content 1fr min-content;
    overflow: hidden;

    background-image: radial-gradient(var(--app-grid-marker-fill) 1px, transparent 1px);
    background-size: var(--app-grid-marker-spacing) var(--app-grid-marker-spacing);
    background-position: var(--app-grid-marker-offset) var(--app-grid-marker-offset);

    [data-role="app:body"],
    [data-role="app:main"],
    [data-role="app:sidebar"] {
      height: 100%;
      overflow: hidden;
    }

    [data-role="app:main"] {
      padding-inline-end: var(--lookbook-grid-gap);
      padding-block-end: var(--lookbook-grid-gap);
    }

    [data-role="app:footer"] {
      height: min-content;
      overflow: hidden;
    }
  }
</style>
