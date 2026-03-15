<script>
  import Prose from "@components/prose";
  import Button from "@components/button";
  import Toolbar from "@components/toolbar";
  import Splitter from "@components/splitter";
  import Breadcrumb from "@components/breadcrumb";
  import ButtonGroup from "@components/button-group";

  let { page, children, ancestors } = $props();

  let crumbs = $derived.by(() => [...ancestors, page]);
</script>

<div data-component="page">
  <div data-role="page:toolbar">
    <Toolbar variant="transparent">
      {#snippet start()}
        <Breadcrumb data-role="page:breadcrumb" {crumbs}></Breadcrumb>
      {/snippet}
      {#snippet end()}{/snippet}
    </Toolbar>
  </div>

  <Splitter
    orientation="horizontal"
    panels={[{ id: "contentPane" }, { id: "tocPane" }]}
    defaultSize={[75, 25]}
  >
    <!-- bind:size={() => previewSplit, (sizes) => setSidebarWidth(sizes[1])} -->
    {#snippet contentPane()}
      <div data-role="page:body">
        <!-- <header data-role="page:header">
          <h1 data-role="page:title">{page.label}</h1>
        </header> -->
        <article data-role="page:article">
          <Prose>
            {@render children?.()}
          </Prose>
        </article>

        <footer data-role="page:footer">footer</footer>
      </div>
    {/snippet}

    {#snippet tocPane()}
      <aside data-role="page:toc">toc</aside>
    {/snippet}
  </Splitter>
</div>

<style>
  [data-component="page"] {
    --page-bg: var(--lookbook-panel-bg);
    --page-border: var(--lookbook-panel-border);
    --page-padding: var(--lookbook-space-lg);

    /*--page-header-height: var(--lookbook-size-12);*/
    --page-footer-height: var(--lookbook-size-10);

    view-transition-name: page;

    height: 100%;
    display: grid;
    grid-template-rows: min-content 1fr;

    [data-role="page:body"] {
      display: grid;
      height: 100%;
      grid-template-rows: 1fr min-content;
      overflow: hidden;
    }

    [data-role="page:toc"] {
      background-color: var(--page-bg);
      border: 1px solid var(--page-border);
    }

    [data-role="page:article"] {
      background-color: var(--page-bg);
      border: 1px solid var(--page-border);
      padding: var(--page-padding);
      height: 100%;
      overflow: auto;
    }

    [data-role="page:header"] {
      border-bottom: 1px solid var(--page-border);
      padding: var(--page-padding);
    }

    [data-role="page:title"] {
    }

    [data-role="page:toc"] {
      padding: var(--page-padding);
    }

    [data-role="page:footer"] {
      border-top: 1px solid var(--page-border);
      height: var(--page-footer-height);
      padding-inline: var(--page-padding);
      display: flex;
      align-items: center;
    }
  }

  :root::view-transition-old(page) {
    animation: 0.1s ease-in both fade-out;
  }

  :root::view-transition-new(page) {
    animation: 0.1s ease-in both fade-in;
  }
</style>
