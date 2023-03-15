---
id: ui-favicon
label: Favicon
title: Customising the favicon
---

<%= render section(overview: true) do |s| %>
  The favicon served by Lookbook can be customised using the `ui_favicon` [config option](<%= guide_url :configuration %>).
<% end %>

<%= render section("Custom favicon", id: "custom-favicon") do |s| %>
  <% s.with_block_prose do %>
    You can supply your own favicon as an `svg` string:
  
    ```ruby
    config.lookbook.ui_favicon = "<svg>...</svg>"
    ```
  <% end %>

  <% s.with_block_subheading "Light and dark color schemes", level: 3 %>
  <% s.with_block_prose do %>  
    To specify different favicons for light and dark browser themes, use a hash of favicon `svg` strings:

    ```ruby
    config.lookbook.ui_favicon = {
      light: "<svg>...</svg>", # used when `prefers-color-scheme: light`
      dark: "<svg>...</svg>",  # used when `prefers-color-scheme: dark`
    }
    ```
  <% end %>

  <% s.with_block_note :tip do %>  
    Favicon SVGs **should not** be URL encoded. Lookbook will handle the encoding and conversion to a data URI automatically.
  <% end %>
<% end %>

<%= render section("Disabling the favicon", id: "disable-favicon") do |s| %>

  To prevent Lookbook from serving any favicon at all, set the `ui_favicon` option to `false`:

  ```ruby
  config.lookbook.ui_favicon = false
  ```
<% end %>