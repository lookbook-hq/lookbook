---
id: ui-nav
label: Navigation
title: Navigation
---

<%= render section(overview: true) do |s| %>
  <% s.with_block_prose do %>
    There are a number of options available for customising elements of the Lookbook navigation.
  <% end %>

  <% s.with_block_note :tip do %>
    The below options apply to the nav as a whole. Customisation of individual items _within_ the nav is handled via [annotations](<%= guide_url :previews_nav %>) (for previews) or [front matter](<%= guide_url :pages_frontmatter %>) (for pages).
  <% end %>
<% end %>

<%= render section("Section labels", id: "labels") do |s| %>
  
  To change the label text used in the **previews** section header, use the `preview_collection_label` config option: 

  ```ruby
  config.lookbook.preview_collection_label = "Components" # defaults to "Previews"
  ```

  To change the label text used in the **pages** section header, use the `page_collection_label` config option: 

  ```ruby
  config.lookbook.page_collection_label = "Docs" # defaults to "Pages"
  ```
<% end %>

<%= render section("Scenario order", id: "scenario-order") do |s| %>
  By default scenarios are listed in the navigation in the order in which they are defined in the preview class.

  To order scenarios alphabetically in the navigation instead, use the `preview_sort_scenarios` config option:

  ```ruby
  config.lookbook.preview_sort_scenarios = true
  ```
<% end %>
