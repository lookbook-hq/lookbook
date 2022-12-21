---
id: params-styles
label: Styles & JavaScript
title: Styles & JavaScript
---

<%= render section(overview: true) do |s| %>
  <% s.with_block_prose do %>
    If you wish to specify custom CSS rules to style the contents of the input partial,
    just include a `<style>` element in  the [input panel partial](<%= extend_url :params_templates %>):

    ```erb
    <style>
      input {
        border: 1px solid hotpink;
      }
    </style>

    <input type="text"> <!-- will have a hotpink border -->
    ```
  <% end %>

  <% s.with_block_note :info do %>
    The `<style>` element will be removed when the input is rendered and any styles will be
    automagically **scoped to the input partial that they are defined in**, so they will not affect other inputs or
    leak out to affect the styling of the UI in general.
  <% end %>
<% end %>
