---
id: pages-embedding
label: Rendering Previews
title: Rendering Embedded Previews
---

<%= render section(overview: true) do |s| %>
  <% s.with_block_prose do %>
    You can embed previews from your project directly into Lookbook content pages to help create **living documents**
    that always feature the latest changes to your component previews.

    A basic preview embed within a documentation page looks like this:
  <% end %>

  <% s.with_block_screenshot "guide/docs_embedded_preview.png", "Basic preview embed" %>

<% end %>

<%= render section("Adding previews to pages", id: "embedding") do |s| %>

  <% s.with_block_prose do %>

    Preview embeds are added to pages using the `<lookbook-embed>` element.
    Customisation options are set using attribute key/value pairs on the element:

    ```html
    <lookbook-embed
      preview="Feedback::BlankSlateComponentPreview"
      scenario="default"
      panels="params,source,output">
    </lookbook-embed>
    ```
  <% end %>

  <% s.with_block_note :link do |note| %>
    See [preview embed configuration](<%= guide_url :embeds %>#configuration) section
    to learn more about available customisation options.
  <% end %>

  <% s.with_block_subheading "Getting embed codes", id: "embed-codes" %>
   <% s.with_block_prose do %>
    The quickest way to get an embed code is to open the relevant preview in Lookbook and click on the
    'embed' icon in the top right toolbar.
    
    This will open a panel where you can see the embed code for the current preview.
    Just copy and paste the code from here into the desired page and the preview embed will be displayed.
  <% end %>

  <% s.with_block_screenshot "guide/embed_code_dropdown.png", "Embed code dropdown" %>

  <% s.with_block_note :tip do |note| %>
    The embed code will automatically reflect any `@param` values that have been set - so the resulting embed will default to these values.
  <% end %>
<% end %>

<%= render section("The `embed` helper", id: "embed-helper") do |s| %>
  <% s.with_block_prose do %>
    There is an `embed` helper method available to Lookbook content pages that can be used as an alternative to using embed codes directly.
  
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


