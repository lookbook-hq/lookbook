---
id: panels-styles
label: Styles & JavaScript
title: Styles & JavaScript
---

<%= render section("Adding styles", id: "css") do |s| %>
  <% s.with_block_prose do %>
    If you wish to specify custom CSS rules to style the contents of the panel, just include a `<style>` element in the panel partial template:

    ```erb
    <style>
      h3 {
        color: green;
      }
    </style>

    <div>
      <h3>My Custom Panel</h3> <!-- will be green -->
      <!-- ... -->
    </div>
    ```
  <% end %>

  <% s.with_block_note :info do %>
    The `<style>` element will be removed when the panel is rendered and any styles will be automagically **scoped to the panel that they are defined in**, so they will not affect other panels or leak out to affect the styling of the UI in general.
  <% end %>

  <% s.with_block_subheading "Utility classes", id: "utility-classes" %>

  <% s.with_block_prose do %>
    There are a number of utility classes available for use in panels to make it easier to match the look and feel of the rest of the Lookbook UI.

    * `.lookbook-panel`: Apply to the panel's root element
    * `.prose`: Apply to text content containers. Adds default prose styles to child elements.
  <% end %>
<% end %>


<%= render section("Adding JavaScript", id: "js") do |s| %>
  <% s.with_block_prose do %>
    Lookbook uses [Alpine JS](https://alpinejs.dev/) for its UI, and it is available for use in panel templates too. It's a great way to add interactivity without ever having to touch a script tag.

    For example, to add a button to show/hide a piece of content in the panel, it's as simple as this:

    ```erb
    <div x-data="{ open: false }">
      <button @click="open = !open">Show/hide content</button>
      <div x-show="open">
        Some content here
      </div>
    </div>
    ```

    Check out the [Alpine JS documentation](https://alpinejs.dev/) for more information.
  <% end %>

  <% s.with_block_note :warn do %>
    Because of the way that new content is loaded in to the UI when navigation occurs, adding arbitrary JavaScript in a `script` tag within
    the panel template may not always work as expected, so it is recommended to use Alpine for adding interactivity where required.
  <% end %>
<% end %>
