---
id: panels-templates
label: Panel Templates
title: Panel Templates
---

<%= render section(id: "overview") do |s| %>
  <% s.with_title "Overview", hidden: true %>

  Panel template files are just regular ERB partials, and can can live anywhere in your app's `views` directory. Unlike [documentation page templates](/guide/pages/) they are **not** additionally run through the markdown parser.

  To match the padding and styles of the system panels you should ensure your panel's content is in an element with the `.lookbook-panel` class applied to it.

  ```html
  <div class="lookbook-panel">
    <!-- your panel content here -->
  </div>
  ```

  Each panel has access to a number of variables and helpers that can be used to build dynamic content.
<% end %>

<%= render section(id: "variables") do |s| %>
  <% s.with_title "Variables" %>

  <% s.with_block_prose do %>    
    The following variables are available in panel templates:
  <% end %>

  <% s.with_block_method_list do |list| %>
    <% site.data.dev_docs.panel_variables.each do |var| %>
      <% add_toc_entry({label: var[:name], id: var[:id], level: 3 }) %>
      <% list.with_item_method(**(var.symbolize_keys)) %>
    <% end %>
  <% end %>
<% end %>

<%= render section(id: "helpers") do |s| %>
  <% s.with_title "Helpers" %>

  All component helpers are available for use within panel templates. See the [component helper docs](<%= api_url :components_helper %>) for details.
<% end %>
