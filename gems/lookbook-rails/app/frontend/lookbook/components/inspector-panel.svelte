<script>
  import Snippet from "@components/snippet";
  import ParamsEditor from "@components/params-editor";

  let { component, props } = $props();

  const decodeHTML = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };
</script>

<div data-component="inspector-panel" data-type={component}>
  {#if component === "snippet"}
    <Snippet {...props}>
      {@html decodeHTML(props.content)}
    </Snippet>
  {:else if component === "params"}
    <ParamsEditor {...props}></ParamsEditor>
  {:else if props.content}
    <div data-role="inspector-panel:content">
      {props.content}
    </div>
  {/if}
</div>

<style>
  [data-component="inspector-panel"] {
    padding: 1rem;
  }
</style>
