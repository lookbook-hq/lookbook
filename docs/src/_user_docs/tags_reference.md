---
id: tags-reference
title: Tags Reference
---

<%= render section(overview: true) do |s| %>
  <% s.with_block_prose do %>
    The following tags are available for [annotating preview classes](<%= guide_url :previews_annotations %>):
  <% end %>

  <% s.with_block_method_list do |list| %>
    <% site.data.tags.each do |tag| %>
      <% id = tag[:name].tr("@","") %>
      <% add_toc_entry({label: tag[:name], id: id, level: 3 }) %>
      <% list.with_item_method(
        **(tag.symbolize_keys),
        wrap_args: false,
        signature_call: tag[:name],
        id: id,
        example_lang: :rb
      ) %>
    <% end %>
  <% end %>
<% end %>

 