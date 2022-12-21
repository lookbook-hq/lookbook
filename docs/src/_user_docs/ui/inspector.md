---
id: ui-inspector
title: Preview Inspector
---

<%= render section(id: "overview") do |s| %>
  <% s.with_title "Overview", hidden: true %>

  The Lookbook **preview inspector** is where each preview is rendered alongside its source code, notes and more.

  The inspector is made up of a number of tabbed panels, grouped into two areas - the preview area at the top (with **Preview** and **HTML** tabs)
  and the drawer area at the bottom (with **Source**, **Notes**, and **Params** tabs).

  It is possible to add custom tab panels into the drawer area, as well as to hide, reposition or reorder the system-provided panels.

  <!-- TODO: SCREENSHOT -->
<% end %>

<%= render section("Choosing panels to display", id: "choosing-panels") do |s| %>
  You can customise which panels are displayed using the `preview_inspector.panels` [config option](<%= guide_url :configuration %>).

  This expects an array of panel names in the order in which they should be displayed in the inspector. For example:

  ```ruby
  config.preview_inspector.panels = [:source, :notes, :params]
  ```

  To include all panels (including custom panels) that are not yet included in the list you can add a `"*"` entry as the last list item:

  ```ruby
  # show the notes panel first, then all others.
  config.preview_inspector.panels = [:notes, "*"]
  ```
<% end %>

<%= render section("Editing panel properties", id: "editing-panels") do |s| %>
  You can edit the properties of any system-provided panels if you wish to change things like the panel tab text or the hotkey associated with that panel.

  See the [panel editing docs](<%= extend_url :panels_editing %>) for details.
<% end %>

<%= render section("Adding custom panels", id: "adding-panels") do |s| %>
  It is possible to add your own completely custom panels to the inspector to customise the preview experience further.

  See the [custom panel developer docs](<%= extend_url :panels_adding %>) for more information.
<% end %>
