---
id: hooks
label: Lifecycle Hooks
title: Lifecycle Hooks
---
<%
lookbook_data = api_module_data("Lookbook")
hook_methods_data = lookbook_data[:methods].filter do |m|
  name = m[:name].to_s
  name.start_with?("before_") || name.start_with?("after_")
end
%>

<%= render section(overview: true) do |s| %>
  A number of lifecycle hooks are available for use in triggering actions outside of Lookbook.
  Hook callbacks can be registered when [configuring your Lookbook installation](<%= guide_url :configuration %>).

  All hook callback blocks are yielded the main [`Lookbook` application object](<%= api_module_url "Lookbook" %>)
  as the first argument. Some hooks additionally supply other arguments - see below for details.
<% end %>

<%= render section(id: "available-hooks") do |s| %>
  <% s.with_title "Available Hooks" %>

  <% s.with_block_prose do %>
    The following hooks are available to register callbacks on:
  <% end %>

  <% s.with_block_method_list do |list| %>
    <% hook_methods_data.each do |meth| %>
      <% add_toc_entry({label: meth[:name], id: meth[:id], level: 3 }) %>
      <% list.with_item_method(**(meth.symbolize_keys)) %>
    <% end %>
  <% end %>
<% end %>


