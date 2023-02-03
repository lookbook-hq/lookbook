---
id: pages-embedding
title: Embedding Previews
---

<%= render section(overview: true) do |s| %>
  <% s.with_block_prose do %>
    You can embed previews from your project directly into documentation pages to help create **living documents**
    that always feature the latest changes to your component previews.

    A basic preview embed within a documentation page looks like this:
  <% end %>

  <% s.with_block_screenshot "guide/docs_embedded_preview.png", "Basic preview embed" %>

<% end %>

<%= render section("Embedding previews", id: "embedding") do |s| %>

  <% s.with_block_prose do %>

    Preview embeds are added to pages using the `<lookbook-embed>` element.

    ```html
    <lookbook-embed
      app="https://myapp.com/lookbook"
      preview="Feedback::BlankSlateComponentPreview"
      scenario="default"
      panels="params,source,output">
    </lookbook-embed>
    ```

    Configuration options are set using attribute key/value pairs on the element. See the 

  <% end %>

  <% s.with_block_note :tip do |note| %>
    There are full details of how to use preview embeds on external sites in the [preview embeds documentation](<%= guide_url :embeds %>).
    Using embeds in Lookbook pages is **no different**, except that you don't need to do any of the setup work. 
  <% end %>
<% end %>

<%= render section("The `embed` helper", id: "embed-helper") do |s| %>
  <% s.with_block_prose do %>
    There is an `embed` helper method available to page templates that can be used to generate the embed element's HTML.
  
    The helper accepts a preview class and a method name (as a symbol) to determine what to render:

    ```erb
    <%%= embed Feedback::BlankSlateComponentPreview, :default %>
    ```

    This will generate a preview for the `default` scenario of the `Elements:ButtonComponentPreview` preview class.
  <% end %>

  <% s.with_block_subheading "Preview params", id: "preview-params" %>
  <% s.with_block_prose do %>
    If you have configured your scenarios to accept [preview params](<%= guide_url :previews_params %>), then you can supply values for those params
    when rendering the embedded preview:

    ```erb
    <%%= embed Feedback::BlankSlateComponentPreview, :default, params: {
      icon: "plus",
      text: "Add new"
    } %>
    ```    
  <% end %>

  <% s.with_block_subheading "Panels", id: "panels" %>
  <% s.with_block_prose do %>
    Preview embeds can be configured to display one or more [inspector panels](<%= guide_url :ui_inspector %>).

    The `panels` option accepts an array of panel names of the panels you wish to display for this embed:

    ```erb
    <%%= embed Feedback::BlankSlateComponentPreview, :default, panels: ["source", "notes"] %>
    ```    
  <% end %>

  <% s.with_block_data_list title: "Available panels:", data: site.data.inspector_panels %>

   <% s.with_block_note :tip do %>
    Note that the wildcard character `*` can be used to represent 'all other panels'. 

    ```html
    ["*"] <!-- show all panels, including any custom ones -->
    ["notes", "source", "*"] <!-- show notes, then source, then all other panels -->
    ```
  <% end %>

  <% s.with_block_screenshot "guide/docs_embedded_preview_with_panels.png", "Preview embed with source and notes panels" %>

<% end %>


