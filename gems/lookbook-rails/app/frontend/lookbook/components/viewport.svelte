<script>
  import { PersistedState } from "runed";
  import { Frame } from "@ark-ui/svelte";

  import Icon from "@components/icon";
  import { GripHorizontalIcon } from "lucide-svelte";

  const sandbox = [
    "allow-forms",
    "allow-modals",
    "allow-popups",
    "allow-pointer-lock",
    "allow-same-origin",
    "allow-popups-to-escape-sandbox",
    "allow-scripts",
    "allow-top-navigation-by-user-activation",
  ].join(" ");
  const handles = ["east", "west", "southeast", "south", "southwest"];
  const FULLSIZE = 100000;

  let { src, srcdoc, title } = $props();

  let viewportState = new PersistedState("viewport", {
    width: FULLSIZE,
    height: FULLSIZE,
  });

  let initial = $state(null);
  let activeHandle = $state(null);

  let resizer, container;

  function startResize(event) {
    const rect = resizer.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    activeHandle = event.target;

    initial = {
      maxWidth: containerRect.width,
      maxHeight: containerRect.height,
      width: rect.width,
      height: rect.height,
      x: event.pageX,
      y: event.pageY,
    };
  }

  function resizing(event) {
    if (!activeHandle) return;

    let delta;
    const direction = activeHandle.dataset.direction;

    if (direction.match(/east|west/)) {
      delta = direction.match("east") ? event.pageX - initial.x : initial.x - event.pageX;

      viewportState.current.width = Math.min(initial.width + delta * 2, initial.maxWidth);
      if (viewportState.current.width === initial.maxWidth) {
        viewportState.current.width = FULLSIZE;
      }
    }

    if (direction.match("south")) {
      delta = event.pageY - initial.y;

      viewportState.current.height = Math.min(initial.height + delta, initial.maxHeight);
      if (viewportState.current.height === initial.maxHeight) {
        viewportState.current.height = FULLSIZE;
      }
    }
  }

  function endResize() {
    activeHandle = null;
    initial = null;
  }

  function maximize(event) {
    const direction = event.target.dataset.direction;

    if (direction.match(/east|west/)) {
      viewportState.current.width = FULLSIZE;
    }

    if (direction.match("south")) {
      viewportState.current.height = FULLSIZE;
    }
  }
</script>

<svelte:window onmousemove={resizing} onmouseup={endResize} />

<div
  data-component="viewport"
  style:--viewport-window-width={viewportState.current.width}
  style:--viewport-window-height={viewportState.current.height}
  bind:this={container}
>
  <div data-role="viewport:background"></div>
  <div data-role="viewport:window" bind:this={resizer}>
    {#if src}
      <iframe data-role="viewport:iframe" {src} {title} {sandbox} inert={activeHandle !== null}
      ></iframe>
    {:else}
      <Frame data-role="viewport:iframe" {srcdoc} {title} {sandbox} inert={activeHandle !== null}
      ></Frame>
    {/if}

    {#each handles as direction}
      <button
        data-role="viewport:handle"
        data-direction={direction}
        aria-label={`drag-${direction}`}
        onmousedown={(e) => startResize(e)}
        ondblclick={(e) => maximize(e)}
      >
        <Icon svg={GripHorizontalIcon} size="sm" />
      </button>
    {/each}
  </div>
</div>

<style>
  :global [data-component="viewport"] {
    --viewport-bg: var(--lookbook-block-bg);
    --viewport-bg-check-even: var(--lookbook-accent);
    --viewport-bg-check-odd: color-mix(
      in oklab,
      var(--lookbook-accent),
      var(--lookbook-mix-quieter) 40%
    );
    --viewport-bg-check-size: var(--lookbook-size-3);

    --viewport-window-bg: var(--lookbook-panel-bg);
    --viewport-window-outline: color-mix(
      in oklab,
      var(--viewport-bg-check-odd),
      var(--lookbook-mix-louder) 5%
    );
    --viewport-window-shadow: var(--lookbook-shadow-lg);
    --viewport-window-width: 100000;
    --viewport-window-height: 100000;

    --viewport-handle-size: var(--lookbook-size-3);
    --viewport-handle-bg: var(--lookbook-panel-bg);
    --viewport-handle-bg-hover: color-mix(in oklab, var(--lookbook-block-bg), transparent 50%);
    --viewport-handle-fg: var(--lookbook-panel-fg);
    --viewport-handle-border: var(--lookbook-panel-border);
    --viewport-corner-handle-bg: var(--lookbook-panel-bg);
    --viewport-corner-handle-bg-hover: var(--viewport-handle-bg-hover);
    --viewport-corner-handle-fg: var(--lookbook-panel-fg);

    position: relative;
    display: flex;
    justify-content: center;
    align-items: start;
    overflow: hidden;

    width: calc(100%);
    height: calc(100%);
    background-color: var(--viewport-bg);

    .icon {
      pointer-events: none;
    }

    [data-role="viewport:background"] {
      position: absolute;
      inset: 0;
      z-index: 0;

      background-repeat: repeat;
      background-size: var(--viewport-bg-check-size) var(--viewport-bg-check-size);
      background-position: top left;
      background-image: conic-gradient(
        var(--viewport-bg-check-even) 90deg,
        var(--viewport-bg-check-odd) 90deg 180deg,
        var(--viewport-bg-check-even) 180deg 270deg,
        var(--viewport-bg-check-odd) 270deg
      );
    }

    [data-role="viewport:window"] {
      background-color: var(--viewport-window-bg);
      outline: 1px solid var(--viewport-window-outline);
      outline-offset: 0px;
      min-height: 100px;
      min-width: 100px;
      display: grid;
      grid-template-areas:
        "w content e"
        "sw s se";
      grid-template-columns: var(--viewport-handle-size) 1fr var(--viewport-handle-size);
      grid-template-rows: 1fr var(--viewport-handle-size);

      width: min(100%, (var(--viewport-window-width) * 1px));
      height: min(100%, (var(--viewport-window-height) * 1px));
      position: relative;
      z-index: 1;
      box-shadow: var(--viewport-window-shadow);

      &:hover {
        [data-role="viewport:handle"] {
          background-color: var(--viewport-handle-bg-hover);

          .icon {
            opacity: 1;
          }

          &[data-direction="southeast"],
          &[data-direction="southwest"] {
            background-color: var(--viewport-corner-handle-bg-hover);
          }
        }
      }
    }

    [data-role="viewport:iframe"] {
      grid-area: content;
      position: relative;
      min-height: 100px;
      min-width: 150px;
      z-index: 2;
      height: 100%;
      width: 100%;
      border: 0;
      view-transition-name: viewport;
      border: 0;
    }

    [data-role="viewport:handle"] {
      color: var(--viewport-handle-fg);
      background-color: var(--viewport-handle-bg);
      transition:
        background-color var(--lookbook-duration-fast) ease-in,
        border-color var(--lookbook-duration-fast) ease-in;
      border: 0px dashed var(--viewport-handle-border);

      position: relative;
      z-index: 3;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      .icon {
        transition: opacity var(--lookbook-duration-fast) ease-in;
        width: var(--viewport-handle-size);
        height: var(--viewport-handle-size);
        position: relative;
        transform-origin: center center;
      }

      &[data-direction="west"] {
        grid-area: w;
        cursor: ew-resize;
        border-inline-end-width: 1px;

        .icon {
          transform: rotate(90deg);
        }
      }

      &[data-direction="east"] {
        grid-area: e;
        cursor: ew-resize;
        border-inline-start-width: 1px;

        .icon {
          transform: rotate(90deg);
        }
      }

      &[data-direction="southwest"] {
        grid-area: sw;
        background-color: var(--viewport-corner-handle-bg);
        cursor: nesw-resize;

        .icon {
          top: -1px;
          right: -1px;
          transform: rotate(45deg);
        }
      }

      &[data-direction="south"] {
        grid-area: s;
        cursor: ns-resize;
        border-block-start-width: 1px;

        .icon {
          transform: rotate(0);
        }
      }

      &[data-direction="southeast"] {
        grid-area: se;
        background-color: var(--viewport-corner-handle-bg);
        cursor: nwse-resize;

        .icon {
          top: -1px;
          left: -1px;
          transform-origin: center center;
          transform: rotate(-45deg);
        }
      }
    }
  }

  :global {
    :root::view-transition-old(viewport) {
      animation: 0.25s ease-in both fade-out;
    }

    :root::view-transition-new(viewport) {
      animation: 0.15s ease-in both fade-in;
    }
  }
</style>
