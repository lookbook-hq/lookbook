---
id: ui-branding
label: Branding 
title: Branding
---

<%= render section(overview: true) do |s| %>
  The [project name](#project-name), [logo](#project-logo) and [favicon](#favicon) can be customised as required.
<% end %>

<%= render section("Project name", id: "project-name") do |s| %>
  <% s.with_block_prose do %>
    The project name is displayed in the header. It defaults to the name of the host application.
  <% end %>

  <%# s.with_block_subheading "Custom project name", id: "custom-project-name", level: 3 %>
  <% s.with_block_prose do %>
    To **customise the name**, use the `project_name` config option:
  
    ```ruby
    config.lookbook.project_name = "GlobalCorp Components"
    ```
  <% end %>

  <%# s.with_block_subheading "Hiding the project name", id: "hide-project-name", level: 3 %>
  <% s.with_block_prose do %>  
    To **hide the project name** completely, set the `project_name` option to `false`:

    ```ruby
    config.lookbook.project_name = false
    ```
  <% end %>

  <% s.with_block_note :tip do %>  
    The project name will be **automatically hidden** if a [project logo](#project-logo) has been specified but no custom name has been configured.
  <% end %>
<% end %>

<%= render section("Logo", id: "project-logo") do |s| %>
  <% s.with_block_prose do %>
    The project logo is displayed in the header, next to the project name. It defaults to the Lookbook logo.
  <% end %>

  <%# s.with_block_subheading "Custom logo", id: "custom-logo", level: 3 %>
  <% s.with_block_prose do %>
    You can **provide an alternative logo** as an `SVG` string:
  
    ```ruby
    config.lookbook.project_logo = "<svg>...</svg>"
    ```
  <% end %>

   <% s.with_block_note :tip do %>  
    To match the header text color the fill and/or stroke of the `SVG`
    should be set to `currentColor`. The logo SVG is embedded into the header so will inherit the
    text color from the theme.

    ```ruby
    config.lookbook.project_logo = "<svg stroke='currentColor'>...</svg>"
    ```
  <% end %>

  <% s.with_block_note :warn do %>  
    Logos will be scaled to fill the available height within the header.
    To ensure the width is set proportionally it is recommended to ensure there is a `viewBox` attribute
    on the root node, and to **remove** any width or height attributes:

    ```ruby
    config.lookbook.project_logo = "<svg viewBox='0 0 32 32'>...</svg>"
    ```
  <% end %>

  <%# s.with_block_subheading "Hiding the logo", id: "hide-project-logo", level: 3 %>
  <% s.with_block_prose do %>  
    To **hide the logo** completely, set the `project_logo` option to `false`:

    ```ruby
    config.lookbook.project_logo = false
    ```
  <% end %>
<% end %>

<%= render section("Favicon", id: "favicon") do |s| %>
  <% s.with_block_prose do %>
    By default Lookbook serves the Lookbook logo as a [favicon](https://en.wikipedia.org/wiki/Favicon), but this can be customised using the `ui_favicon` config option:
  <% end %>

  <%# s.with_block_subheading "Custom favicon", id: "custom-favicon", level: 3 %>
  <% s.with_block_prose do %>
    You can **provide an alternative** favicon as an `SVG` string:
  
    ```ruby
    config.lookbook.ui_favicon = "<svg>...</svg>"
    ```
  <% end %>

  <% s.with_block_prose do %>  
    To specify different favicons for light and dark browser themes, use a hash of favicon `SVG` strings:

    ```ruby
    config.lookbook.ui_favicon = {
      light: "<svg>...</svg>", # used when `prefers-color-scheme: light`
      dark: "<svg>...</svg>",  # used when `prefers-color-scheme: dark`
    }
    ```
  <% end %>

  <% s.with_block_note :warn do %>  
    Favicon SVGs **should not** be URL encoded. Lookbook will handle the encoding and conversion to a data URI automatically.
  <% end %>

  <%# s.with_block_subheading "Disabling the favicon", id: "disable-favicon", level: 3 %>
  <% s.with_block_prose do %>  
    To prevent Lookbook from serving any favicon, set the `ui_favicon` option to `false`:

    ```ruby
    config.lookbook.ui_favicon = false
    ```
  <% end %>
<% end %>