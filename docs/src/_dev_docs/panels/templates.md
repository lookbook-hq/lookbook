---
id: panels-templates
label: Panel Templates
title: Panel Templates
---

<%= prose "Overview", heading: {hidden: true} do %>

  Panel template files are just regular ERB partials. Unlike [pages](/guide/pages/) they are **not** additionally parsed as markdown.

  To match the padding and styles of the system panels you should ensure your panel's content is in an element with the `.lookbook-panel` class applied to it.

  ```html
  <div class="lookbook-panel">
    <!-- your panel content here -->
  </div>
  ```

  Each panel has access to a number of variables and helpers that can be used to build dynamic content.

<% end %>

<%= prose "Variables" do %>

  _Docs coming soon_

<% end %>

<%= prose "Helpers" do %>

  _Docs coming soon_

<% end %>