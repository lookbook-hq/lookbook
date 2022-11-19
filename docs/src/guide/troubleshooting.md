---
title: Troubleshooting
layout: default
---

Some common problems that people run into when using Lookbook.

If you are running into problems and nothing here is relevant then head over to the [Lookbook repo]({{ site.data.external.lookbook.github.home }}) and open an issue or discussion to get help from the community.

## 🚨 Forking servers - changes not showing up

Lookbook does not play nicely when using a forking server such as Puma in [clustered mode](https://github.com/puma/puma#clustered-mode) (i.e. with a `WEB_CONCURRENCY` value of > 1). This is due to a [limitation of the underlying library](https://github.com/ViewComponent/lookbook/issues/98#issuecomment-1253796251) that is used to watch for changes.

If running in clustered mode, any changes made to preview files or components will not appear in Lookbook without restarting the server.

**This can be fixed** by setting `WEB_CONCURRENCY=1` so that the server does not run in clustered mode. Not always the best solution but there is no other way around this issue at the current time.

## 🚨 Template error in preview window

When previewing components, if you are seeing an `ActionView::Template::Error` error with (something similar to) the following message:

```
No route matches {:action=>"preview", :controller=>"lookbook/previews", :path=>"path_to/current_component"}
```

Then it may be being caused by the use of `link_to` tag helpers in your preview layout (if you have specified one) or your application layout.

Due to the way Lookbook renders the layout, some forms of `link_to` arguments do not currently work and will cause the error described above.

To fix the issue you can either use one of the `link_to` forms that work (see below) or remove the links from your layout (and perhaps [use a preview-specific layout](https://viewcomponent.org/guide/previews.html#layouts) if you are currently using the default application layout).

```erb
<%= link_to "Click here", "/foo/bar" %>  ✅ works

<%= link_to "Click here", edit_thing_path(@thing.id) %>  ✅ works

<%= link_to "Click here", locale: :en %>  ❌ doesn't work

<%= link_to "Click here", controller: "demo", action: "index" %>  ❌ doesn't work
```
{{toc}}