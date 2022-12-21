---
id: params-templates
label: Input Templates
title: Input Templates
---

<%= render section(id: "overview") do |s| %>
  <% s.with_title "Overview", hidden: true %>

  Param input template files are just regular ERB partials, and can can live anywhere in your app's `views` directory.

  The input template is responsible for rendering the HTML for the input. As an example, the template for the system-provided `select` param input looks like this:

  ```erb
  <%%= select_tag(name,
    options_for_select(choices || [], value),
    **input_options,
    "x-model": "value"
  ) %>
  ````

  As you can see the standard set of Rails form helpers are available for use if required.
  See below for details of the variables available to the param input templates.
<% end %>

<%= render section("Variables", id: "variables") do |s| %>
  <% s.with_block_prose do %>    
    The following variables are available in input panel templates:
  <% end %>

  <% s.with_block_method_list do |list| %>
    <% site.data.dev_docs.input_variables.each do |var| %>
      <% add_toc_entry({label: var[:name], id: var[:id], level: 3 }) %>
      <% list.with_item_method(**(var.symbolize_keys)) %>
    <% end %>
  <% end %>
<% end %>

<%= render section("Handling updates", id: "updates") do |s| %>
  <% s.with_block_prose do %>    
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

    This technique will work for most types of `<input>` elements, plus `<textarea>` `<select>` elements.
  <% end %>

  <% s.with_block_note :info do %>
    See the [Alpine documentation on the x-model directive](https://alpinejs.dev/directives/model) for full details of all available modifiers.
  <% end %>

  <% s.with_block_subheading "Manually triggering an update", id: "manual-updates" %>

  <% s.with_block_prose do %>
    If your custom input does not use a standard input element, you will need to manually update the Alpine component's `value` property.

    This could be done in an `@click` handler or however makes sense for the input you are building.

    ```html
    <button @click="value = 'YES'">Set to YES</button>
    ```
  <% end %>

  <% s.with_block_note :info do %>
    See the [Alpine documentation on event handling](https://alpinejs.dev/directives/on) for details on listening and responding to events.
  <% end %>
<% end %>