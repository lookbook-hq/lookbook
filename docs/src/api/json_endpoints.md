---
layout: default
title: JSON Endpoints
---

Lookbook currently implements a single JSON endpoint at `/previews.json`, returning previews and their examples:

```ruby
[{
  "name" => "annotated",
  "examples" =>
    [
      {
        "name" => "default",
        "inspect_path" => "/lookbook/inspect/foo/bar/annotated/default"
      }
    ]
}]
```
