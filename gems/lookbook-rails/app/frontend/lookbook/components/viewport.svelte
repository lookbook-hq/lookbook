<script>
  import { Frame } from "@ark-ui/svelte";

  import { getAppState } from "@lib/utils";

  import Icon from "@components/icon";
  import { MoveDiagonalIcon, MoveDiagonal2Icon } from "lucide-svelte";

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
  const grabbers = ["east", "west", "southeast", "south", "southwest"];
  const FULLSIZE = 100000;

  let { srcdoc, title, id } = $props();

  let app = getAppState();
  // svelte-ignore state_referenced_locally
  let viewportState = $derived.by(() => app.viewport);

  let initial = $state(null);
  let activeGrabber = $state(null);

  let resizer, container;

  function startResize(event) {
    const rect = resizer.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    activeGrabber = event.target;

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
    if (!activeGrabber) return;

    let delta;
    const direction = activeGrabber.dataset.direction;

    if (direction.match(/east|west/)) {
      delta = direction.match("east") ? event.pageX - initial.x : initial.x - event.pageX;

      viewportState.width = Math.min(initial.width + delta * 2, initial.maxWidth);
      if (viewportState.width === initial.maxWidth) {
        viewportState.width = FULLSIZE;
      }
    }

    if (direction.match("south")) {
      delta = event.pageY - initial.y;

      viewportState.height = Math.min(initial.height + delta, initial.maxHeight);
      if (viewportState.height === initial.maxHeight) {
        viewportState.height = FULLSIZE;
      }
    }
  }

  function endResize() {
    activeGrabber = null;
    initial = null;
  }

  function maximize(event) {
    const direction = event.target.dataset.direction;

    if (direction.match(/east|west/)) {
      viewportState.width = FULLSIZE;
    }

    if (direction.match("south")) {
      viewportState.height = FULLSIZE;
    }
  }
</script>

<svelte:window onmousemove={resizing} onmouseup={endResize} />

<div
  data-component="viewport"
  style:--viewport-window-width={viewportState.width}
  style:--viewport-window-height={viewportState.height}
  bind:this={container}
>
  <div data-role="viewport:background" class="checkerboard-bg"></div>
  <div data-role="viewport:window" bind:this={resizer}>
    <Frame data-role="viewport:iframe" {srcdoc} {title} {sandbox} inert={activeGrabber !== null}
    ></Frame>

    {#each grabbers as direction}
      <button
        data-role="viewport:grabber"
        data-direction={direction}
        aria-label={`drag-${direction}`}
        onmousedown={(e) => startResize(e)}
        ondblclick={(e) => maximize(e)}
      >
        {#if direction === "southwest"}
          <Icon svg={MoveDiagonalIcon} size="sm" />
        {:else if direction === "southeast"}
          <Icon svg={MoveDiagonal2Icon} size="sm" />
        {:else}{/if}
      </button>
    {/each}
  </div>
</div>

<style>
  :global [data-component="viewport"] {
    --viewport-bg-even: var(--lookbook-accent-yellow);
    --viewport-bg-odd: var(--lookbook-accent-green);
    --viewport-bg-size: var(--lookbook-size-xs);
    --viewport-handle-size: var(--lookbook-size-2xs);

    position: relative;
    display: flex;
    justify-content: center;
    align-items: start;
    overflow: hidden;

    width: calc(100%);
    height: calc(100%);
    background-color: var(--lookbook-surface-bg);

    .icon {
      pointer-events: none;
    }

    [data-role="viewport:background"] {
      --checkerboard-bg-even: var(--viewport-bg-even);
      --checkerboard-bg-odd: var(--viewport-bg-odd);
      --checkerboard-bg-size: 16px;

      position: absolute;
      inset: 0;
      z-index: 0;
    }

    [data-role="viewport:window"] {
      --outline-color: color-mix(in oklab, var(--viewport-bg-odd), black 5%);
      --shadow-color: color-mix(in oklab, var(--viewport-bg-odd), black 80%);

      background-color: var(--lookbook-surface-bg);
      outline: 1px solid var(--outline-color);
      outline-offset: 0px;
      min-height: 116px;
      min-width: 182px;
      display: grid;
      grid-template-areas:
        "w content e"
        "sw s se";
      grid-template-columns: var(--viewport-handle-size) 1fr var(--viewport-handle-size);
      grid-template-rows: 1fr var(--viewport-handle-size);

      width: min(100%, (var(--viewport-window-width, 100000) * 1px));
      height: min(100%, (var(--viewport-window-height, 100000) * 1px));
      position: relative;
      z-index: 1;
      box-shadow: 0 4px 14px color-mix(in oklab, var(--shadow-color), transparent 75%);
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
    }

    [data-role="viewport:grabber"] {
      position: relative;
      z-index: 3;
      width: 100%;
      height: 100%;
      pointer-events: none;
      opacity: 0;
      background-color: var(--lookbook-neutral-solid);
      transition: opacity 150ms ease-in;

      .icon {
        color: white;
        transition: opacity 150ms ease-in;
        opacity: 0;
      }

      &[data-direction="west"] {
        grid-area: w;
        cursor: ew-resize;
      }

      &[data-direction="east"] {
        grid-area: e;
        cursor: ew-resize;
      }

      &[data-direction="southwest"] {
        grid-area: sw;
        background-color: #1d5f57;
        cursor: nesw-resize;
      }

      &[data-direction="south"] {
        grid-area: s;
        cursor: ns-resize;
      }

      &[data-direction="southeast"] {
        grid-area: se;
        background-color: #1d5f57;
        cursor: nwse-resize;
      }
    }

    [data-role="viewport:window"]:hover {
      [data-role="viewport:grabber"] {
        pointer-events: all;
        opacity: 0.1;
      }

      [data-role="viewport:grabber"][data-direction="southwest"],
      [data-role="viewport:grabber"][data-direction="southeast"] {
        opacity: 0.9;
      }

      .icon {
        opacity: 0.9;
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
