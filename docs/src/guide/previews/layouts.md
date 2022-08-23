---
layout: default
title: Preview Layouts
---

Lookbook uses whichever layout template has been specified in the [ViewComponent config](https://viewcomponent.org/guide/previews.html#layouts) to `yield` rendered previews into.

If none has been specified then the default application layout will be used, as per the default ViewComponent behaviour.

{%= note :info do %}
It is **strongly recommended** to use a standalone preview layout for previews so it can be customised without the chance of affecting the main application.
{% end %}

To set a custom layout for all previews, use the `view_component.default_preview_layout` config option:

```rb
# config/application.rb
# Set the default layout to app/views/layouts/component_preview.html.erb
config.view_component.default_preview_layout = "component_preview"
```

See the [ViewComponent docs](https://viewcomponent.org/guide/previews.html#layouts) for more info.

## Example preview layout

A basic preview layout template is shown below. It uses [display variables](/guide/previews/display/) to allow the
background color and and the maximum width of the wrapper to be set on a per-preview basis.

```erb
<!-- app/views/layouts/component_preview.html.erb -->
<!DOCTYPE html>
<html style="background-color: <%= params[:lookbook][:display][:bg_color] || "white" %>">
<head>
  <title>Component Preview</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <%= stylesheet_pack_tag 'application', media: 'all' %>
  <%= javascript_pack_tag 'application' %>
</head>
<body style="padding: 20px">
  <div style="
    margin-left: auto;
    margin-right: auto;
    max-width: <%= params[:lookbook][:display][:max_width] || "100%" %>
  ">
    <%= yield %> <!-- rendered preview will be injected here -->
  </div>
</body>
</html>
```

## Preview helpers

Lookbook includes a few helpers that are only accessible in preview templates and can be used to help clean up [display param](/guide/previews/display/) and [custom data](/guide/extend/data/) access, if desired.

{{ render "methods_list", methods: site.data.preview_layout_helpers }}










{{toc}}