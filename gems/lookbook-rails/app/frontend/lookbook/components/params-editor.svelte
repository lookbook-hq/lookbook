<script>
  import { Field } from "@ark-ui/svelte/field";
  import Switch from "@components/switch";
  import { queryParams } from "@lib/params";

  let { params = [] } = $props();

  const searchParams = queryParams(() => params);
  const id = $props.id();
  const controlId = (param) => `control-${id}-${param.id}`;
</script>

<div data-component="params-editor">
  {#if params.length}
    <div data-role="params-editor:controls">
      {#each params as param, index (controlId(param))}
        {@const {
          label,
          controlType: type = "",
          name,
          value,
          description,
          inputChoices,
          hidden,
        } = param}

        {@const getter = () => searchParams.get(name)}
        {@const setter = (value) => searchParams.set(name, value)}

        <Field.Root id={index} data-role="params-editor:field" data-type={type} {hidden}>
          {#if type === "toggle"}
            <Switch
              name={`params[${name}]`}
              {label}
              bind:checked={
                () => searchParams.get(name), (checked) => searchParams.set(name, checked)
              }
              data-role="params-editor:field-switch"
            />
          {:else}
            <Field.Label data-role="params-editor:label">
              {label}
            </Field.Label>
            {#if type === "select"}
              <Field.Select
                name={`params[${name}]`}
                bind:value={getter, setter}
                defaultValue={value}
                data-role="params-editor:field-select"
              >
                {#each inputChoices as choice}
                  <option value={choice[1]}>{choice[0]}</option>
                {/each}
              </Field.Select>
            {:else}
              <Field.Input
                {type}
                name={`params[${name}]`}
                bind:value={getter, setter}
                defaultValue={value}
                data-role="params-editor:field-input"
              />
            {/if}
          {/if}

          <Field.HelperText data-role="params-editor:hint">
            {description}
          </Field.HelperText>
        </Field.Root>
      {/each}
    </div>
  {:else}
    <div data-role="params-editor:blank-state">No params have been defined for this scenario.</div>
  {/if}
</div>

<style>
  :global [data-component="params-editor"] {
    view-transition-name: params-editor;

    [data-role="params-editor:field"] + [data-role="params-editor:field"] {
      margin-top: var(--lookbook-space-lg);
    }

    [data-role="params-editor:label"] {
      font-size: var(--lookbook-font-size-xs);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      font-weight: 500;
      margin-bottom: var(--lookbook-space-sm);
    }

    [data-role="params-editor:hint"] {
      display: block;
      margin-top: var(--lookbook-space-xs);
      font-size: var(--lookbook-font-size-xs);
      font-style: italic;
      opacity: 0.5;
      line-height: 1.25rem;
    }
  }

  :root::view-transition-old(params-editor) {
    animation: 0.1s ease-in both fade-out;
  }

  :root::view-transition-new(params-editor) {
    animation: 0.1s ease-in both fade-in;
  }
</style>
