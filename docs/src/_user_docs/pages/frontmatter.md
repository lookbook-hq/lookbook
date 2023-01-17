---
id: pages-frontmatter
title: Frontmatter
---

<%= render section(overview: true) do |s| %>
  Pages can use an optional YAML frontmatter block to configure the behaviour of the page and to provide custom data, if required.

  Frontmatter blocks are defined at the top of a page and consists of a valid block of YAML sandwiched between triple-dashes:

  ```markdown
  ---
  title: YAML Frontmatter Example
  label: Frontmatter
  ---
  
  Page content here.
  ```
<% end %>

<%= render section("Available options", id: "options") do |s| %>
  <% s.with_block_prose do %>
    The following frontmatter options are available for each page:
  <% end %>
  <% s.with_block_options_list options: [
    {
      name: "id",
      types: "String",
      text: "A custom page ID that can be used for linking to it from other pages"
    },
    {
      name: "label",
      types: "String",
      text: "The name of the page that will be displayed in the navigation (auto-generated from the file name if not set)"
    },
    {
      name: "title",
      types: "String",
      text: "The main page title displayed on the page (defaults to the label value if not set)."
    },
    {
      name: "hidden",
      types: "Boolean",
      text: "If `false` the page will not appear in the navigation but will still be accessible at it's URL (useful for pages that are still in development)"
    },
    {
      name: "landing",
      types: "Boolean",
      text: "Set to `true` to use the page as the Lookbook landing page (default: `false`)"
    },
    {
      name: "header",
      types: "Boolean",
      text: "Set to `false` to hide the page header containing the page title (default: `true`)"
    },
    {
      name: "footer",
      types: "Boolean",
      text: "Set to `false` to hide the page footer containing the previous/next page links (default: `true`)"
    },
    {
      name: "data",
      types: "Hash",
      text: "Optional hash of custom data to make available for use in the page - see info on <a href=\"#{guide_url :pages_variables}\">page variables & data</a>."
    },
  ] %>

<% end %>

<%= render section("Default values", id: "defaults") do |s| %>
  <% s.with_block_prose do %>
    You can set global default values for page options in the application configuration:

    ```ruby
    # config/application.rb
    config.lookbook.page_options = {
      footer: false,
      data: {
        brand_colors: {
          red: '#ff0000'
        }
      }
    }
    ```

    These will be merged with any page-level frontmatter data. Options set in the frontmatter will override those set at the global
    level (apart from `data`, which will be deep-merged with the any globally defined data).
  <% end %>
<% end %>

