---
id: introduction
label: Introduction
title: Introduction
---

<%= render section(overview: true) do |s| %>
  <% s.with_block_prose do %>    
    Documentation for Lookbook's Ruby API.

    Note that undocumented classes, attributes, methods and suchlike should be considered private. Future releases may change or remove these without deprecation.
  <% end %>
<% end %>

