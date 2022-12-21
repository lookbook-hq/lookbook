---
id: panels-editing
label: Editing Panels
title: Editing Panels
---

<%= render section(id: "editing") do |s| %>
  <% s.with_title "Editing panel properties" %>

  <% s.with_block_prose do %>
    You can edit the properties of any existing panel using the `Lookbook.edit_panel`
    method when you [configure your Lookbook installation](<%= guide_url :configuration %>):
  <% end %>

  <% s.with_block_api_method "Lookbook", :edit_panel, show: [:params] %>

  <% s.with_block_prose do %>
    For example, the following would change the tab label text and hotkey for the notes panel:

    ```ruby
    Lookbook.edit_panel(:notes, {
      label: "Usage Info",
      hotkey: "u",
    })
    ```
  <% end %>
<% end %>

<%= render section(id: "removing") do |s| %>
  <% s.with_title "Removing a panel" %>

  <% s.with_block_prose do %>
    To remove an existing panel from Lookbook altogether, use the `Lookbook.remove_panel` method:
  <% end %>

  <% s.with_block_api_method "Lookbook", :remove_panel, show: [:params] %>

  <% s.with_block_prose do %>   
    For example, to remove the notes panel altogether:

    ```ruby
    Lookbook.remove_panel(:notes)
    ```
  <% end %>
<% end %>