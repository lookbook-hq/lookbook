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

<article data-component="page">
  <div data-role="page:toolbar">
    <Toolbar>
      {#snippet start()}
        <Breadcrumb data-role="page:breadcrumb" {crumbs}></Breadcrumb>
      {/snippet}
      {#snippet end()}{/snippet}
    </Toolbar>
  </div>

  <div data-role="page:body">
    <header data-role="page:header">
      <h1 data-role="page:title">{page.title}</h1>
    </header>

    <Splitter
      orientation="horizontal"
      panels={[{ id: "contentPane" }, { id: "tocPane" }]}
      defaultSize={[75, 25]}
    >
      <!-- bind:size={() => previewSplit, (sizes) => setSidebarWidth(sizes[1])} -->
      {#snippet contentPane()}
        <div data-role="page:content">
          <Prose>
            {@render children?.()}
          </Prose>
        </div>
      {/snippet}

      {#snippet tocPane()}
        <aside data-role="page:toc">toc</aside>
      {/snippet}
    </Splitter>
  </div>

  <footer data-role="page:footer">footer</footer>
</article>

<style>
  [data-component="page"] {
    --page-bg: var(--lookbook-panel-bg);
    --page-border: var(--lookbook-panel-border);
    --page-padding: var(--lookbook-space-md);

    --page-header-height: var(--lookbook-size-12);
    --page-footer-height: var(--lookbook-size-8);

    view-transition-name: page;

    height: 100%;
    display: grid;
    grid-template-rows: min-content 1fr min-content;

    [data-role="page:header"] {
      height: var(--page-header-height);
    }

    [data-role="page:title"] {
    }

    [data-role="page:body"] {
    }

    [data-role="page:toc"],
    [data-role="page:content"] {
      background-color: var(--page-bg);
      border: 1px solid var(--page-border);
      padding: 1px solid var(--page-padding);
    }

    [data-role="page:content"] {
      height: 100%;
    }

    /*[data-role="page:toc"] {
    }*/

    [data-role="page:footer"] {
      height: var(--page-footer-height);
    }
  }

  :root::view-transition-old(page) {
    animation: 0.1s ease-in both fade-out;
  }

  :root::view-transition-new(page) {
    animation: 0.1s ease-in both fade-in;
  }
</style>
