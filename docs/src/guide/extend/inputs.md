---
layout: default
title: Custom Inputs for @params
beta: true
---

Lookbook ships with a number of pre-defined [input types](http://localhost:4000/guide/previews/params/#input-types) that are used when adding [dynamic preview parameters](/guide/previews/params) to your previews.

However if you need an input type that isn't provided by Lookbook (or want to override one of the existing ones) you can easily add your own and then reference them in your `@param` tags.

## Adding a custom param input

To define a custom input you can do so using the `Lookbook.define_param_input` method when configuring your Lookbook installation:

```ruby
Lookbook.define_param_input(<name>, <partial_path>, <opts?>)
```

{%= options_list do |list| %}
  {% list.option name: "<name>", type: "Symbol | String" do %}
    A unique name for the panel
  {% end %}
  {% list.option name: "<partial_path>", type: "String" do %}
    Path to the partial template used to render the input
  {% end %}
  {% list.option name: "<opts>", type: "Hash" do %}
    Set of default options to be passed to the input. Any supplied param options will override these values.
  {% end %}
{% end %}

For example, to create a customised url input with a `https://` prefix in front of it you could do the following:

```ruby
# config/application.rb
Lookbook.define_param_input(:url, "inputs/url")
```

```erb
<!-- app/views/inputs/_url.html.erb -->
<div style="display: flex; align-items: center;">
  <strong>https://</strong>
  <div style="padding-left: 6px">
    <%= text_field_tag(name, value,
        **input_options,
        type: "url",
        "x-model": "value"
      ) %>
  </div>
</div>
```

This input field will then be rendered when using the `url` input type in `@param` tags:

```ruby
class IframeComponentPreview < ViewComponent::Preview
  # @param src url
  def default(src: 'example.com')
    render IframeComponent.new(src: src)
  end
end
```

## Template variables

The following local variables are available to input partial templates:

{{ render "objects_list", objects: site.data.input_variables }}

## Handling updates

Lookbook uses [AlpineJS](https://alpinejs.dev) under the hood for all JavaScript interactions.

Custom input templates are automatically wrapped up as an Alpine component that takes care of handling updates to the preview when it's `value` property changes.

To bind the value of an input to the Alpine component's `value` property you can add an [`x-model` attribute](https://alpinejs.dev/directives/model) to the input, like so:

```html
<input x-model="value">
```

Any changes to the input value will then automatically update the preview and the URL.

To ensure that the preview does not get refreshed too often you may wish to throttle or debounce changes using a modifier:

```html
<input x-model.debounce.300ms="value">
```

{%= note :info do %}
See the [Alpine documentation on the x-model directive](https://alpinejs.dev/directives/model) for full details of all available modifiers.
{% end %}

This technique will work for most types of `<input>` elements, plus `<textarea>` `<select>` elements.

### Manually triggering an update

If your custom input does not use a standard input element, you will need to manually update the Alpine component's `value` property.

This could be done in an `@click` handler or however makes sense for the input you are building.

```html
<button @click="value = 'YES'">Set to YES</button>
```

{%= note :info do %}
See the [Alpine documentation on event handling](https://alpinejs.dev/directives/on) for details on listening and responding to events.
{% end %}

## Styling inputs

If you wish to specify custom CSS rules to style the contents of the input partial, just include a `<style>` element in  the template:

```erb
<style>
  input {
    border: 1px solid hotpink;
  }
</style>

<input type="text"> <!-- will have a hotpink border -->
```

{%= note :info do %}
The `<style>` element will be removed when the input is rendered and any styles will be automagically **scoped to the input partial that they are defined in**, so they will not affect other inputs or leak out to affect the styling of the UI in general.
{% end %}

{{toc}}




