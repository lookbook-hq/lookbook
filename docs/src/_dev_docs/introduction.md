---
id: introduction
label: Introduction
title: Introduction
---

<%= render section(id: "overview") do |s| %>
  <% s.with_title "Overview", hidden: true %>

  <% s.with_block_prose do %>    
    This section provides instructions on how to extend Lookbook to better any specific requirements your project might have.
    
    Lookbook can be extended in a number of ways, including:
    
    * Adding [bespoke preview inspector panels](<%= extend_url :panels_adding %>) to display additianal information.
    * Adding [custom param inputs](<%= extend_url :params_adding %>) to customise the live-editing of preview parameters.
    * Defining [new tags](<%= extend_url :tags_adding %>) to use when annotating preview files
    * [Registering callbacks](<%= extend_url :hooks %>) to help tap into specific events when Lookbook is running.

  <% end %>
<% end %>

<%= render section("UI customisation", id: "ui-customisation") do |s| %>
  UI customisation options (such as theming) are _not_ covered here as they are handled via [configuration](<%= guide_url :configuration %>) rather than code.
  
  See the [UI customisation section](<%= guide_url :ui_theming %>) in the User Guide for more details. 
<% end %>

<%= render section("Lookbook development", id: "contributing") do |s| %>
  We are always looking for new contributors to the development of Lookbook.

  If you have ideas for changes or improvements that need deeper integration than Lookbook's extension APIs can provide then check out the [contributing page](<%= extend_url :contributing %>) for information on how to get involved with the project.
<% end %>

