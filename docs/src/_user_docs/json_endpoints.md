---
id: json-endpoints
title: JSON Endpoints
---

<%= render section(overview: true) do |s| %>
  Lookbook currently implements a single JSON endpoint at `/previews.json`, returning previews and their scenarios:

  ```ruby
  [{
    "name" => "annotated",
    "scenarios" =>
      [
        {
          "name" => "default",
          "inspect_path" => "/lookbook/inspect/foo/bar/annotated/default"
        }
      ]
  }]
  ```
<% end %>
