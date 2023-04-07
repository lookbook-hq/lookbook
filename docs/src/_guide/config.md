---
id: config-reference
title: Config Reference
---

<%= render section do |s| %>
  <% s.with_block_prose do %>
    All available Lookbook configuration options.
  <% end %>

  <% site.data.config_options.each do |group_name, opts| %>
    <% s.with_block_method_list(title: group_name, id: "group-#{group_name}") do |list| %>
      <% add_toc_entry({label: group_name.to_s.capitalize, id: "group-#{group_name}", level: 2, divider: true }) %>
      <% opts.each do |opt| %>
        <% add_toc_entry({label: opt[:name], id: opt[:name], level: 2 }) %>
        <% list.with_item_method(
          id: opt[:name],
          **(opt.symbolize_keys),
          example_lang: :rb
        ) %>
      <% end %>
    <% end %>
  <% end %>
<% end %>
