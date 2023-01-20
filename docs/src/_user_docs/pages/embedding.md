---
id: pages-embedding
title: Embedding Previews
---

<%= render section(overview: true) do |s| %>
  You can embed previews from your project directly into the documentation pages using the `embed` helper,
  which renders an iframe with the rendered preview in it at any point in your document.

  The output looks like this:

  [TODO: INSERT EMBED SCREENSHOT HERE]

<% end %>

<%= render section("Usage", id: "usage") do |s| %>
  <% s.with_block_prose do %>
    To specify which preview to render, the helper accepts a preview class and a method name (as a symbol), like this:

    ```erb
    <%%= embed Elements:ButtonComponentPreview, :default %>
    ```

    This will generate a preview for the `default` scenario of the `Elements:ButtonComponentPreview` preview class.
  <% end %>

  <% s.with_block_subheading "Preview params", id: "preview-params" %>
  <% s.with_block_prose do %>
    If you have configured your scenarios to accept [preview params](<%= guide_url :previews_params %>), then you can supply values for those params
    when rendering the embedded preview:

    ```erb
    <%%= embed Elements:ButtonComponentPreview, :default, params: {
      icon: "plus",
      text: "Add new"
    } %>
    ```    
  <% end %>

<% end %>


