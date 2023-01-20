---
id: previews-layouts
title: Preview Layouts
---

<%= render section(overview: true) do |s| %>

  <% s.with_block_prose do %>

    Previews render with the application layout by default, but it is **strongly recommended** to use a standalone preview layout for previews
    so it can be customised without the chance of affecting the main application.

  <% end %>
<% end %>

<%= render section("Setting the layout", id: "config") do |s| %>

  <% s.with_block_prose do %>
  
    Use the `layout` option to set a specific layout for an individual preview class:

    ```rb
    # test/components/previews/example_component_preview.rb
    class ExampleComponentPreview < Lookbook::Preview
      layout "admin"
      # ...
    end
    ```

    To set a custom layout globally for all previews, use the `preview_layout` [config option](<%= guide_url :config_reference %>#preview_layout):

    ```rb
    # Set the default layout to app/views/layouts/component_preview.html.erb
    config.lookbook.preview_layout = "component_preview"
    ```

  <% end %>

  <% s.with_block_note :tip do %>
    Note that if you are using ViewComponent, this option should be set via the `view_component.default_preview_layout` config option instead, as per the ViewComponent docs:

    ```rb
    config.view_component.default_preview_layout = "component_preview"
    ```

    Lookbook will respect this value when rendering its previews.
  <% end %>
<% end %>

<%= render section("Preview layout example", id: "example") do |s| %>
  <% s.with_block_prose do %>

    An example preview layout template is shown below. It uses [display variables](<%= guide_url :previews_display %>) to allow the
    background color and and the maximum width of the wrapper to be set on a per-preview basis.

    ```erb
    <!-- app/views/layouts/component_preview.html.erb -->
    <!DOCTYPE html>
    <html style="background-color: <%%= params[:lookbook][:display][:bg_color] || "white" %>">
    <head>
      <title>Component Preview</title>
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <%%= stylesheet_pack_tag 'application', media: 'all' %>
      <%%= javascript_pack_tag 'application' %>
    </head>
    <body style="padding: 20px">
      <div style="
        margin-left: auto;
        margin-right: auto;
        max-width: <%%= params[:lookbook][:display][:max_width] || "100%" %>
      ">
        <%%= yield %> <!-- rendered preview will be injected here -->
      </div>
    </body>
    </html>
    ```

  <% end %>
<% end %>

<%= render section("Preview helpers", id: "helpers") do |s| %>
  <% s.with_block_prose do %>
    Lookbook includes a few helpers that are only accessible in preview templates and can be used to help
    clean up [display param](<%= guide_url :previews_params %>) and [custom data](<%= extend_url :data %>) access, if desired:
  <% end %>

  <% s.with_block_api_module_methods(:preview_helper) %>
  
<% end %>