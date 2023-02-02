---
id: introduction
label: Introduction
title: Introduction
---

<%= render section(overview: true) do |s| %>
  <% s.with_block_prose do %>    
    This section provides instructions on how to extend Lookbook to better any specific requirements your project might have.
    
    Lookbook can be extended in a number of ways, including:
    
    * Adding [bespoke preview inspector panels](<%= extend_url :panels_overview %>) to display additional information.
    * Adding [custom input fields](<%= extend_url :inputs_overview %>) to customise the experience of live-editing preview parameters.
    * Defining [new tags](<%= extend_url :tags_overview %>) to use when annotating preview files
    * [Registering callbacks](<%= extend_url :hooks %>) to help tap into specific events when Lookbook is running.

  <% end %>
<% end %>

<%= render section("UI customisation", id: "ui-customisation") do |s| %>
  UI customisation options (such as theming) are _not_ covered here as they are handled via [configuration](<%= guide_url :configuration %>) rather than code.
  
  See the [UI customisation section](<%= guide_url :ui_theming %>) in the User Guide for more details. 
<% end %>
