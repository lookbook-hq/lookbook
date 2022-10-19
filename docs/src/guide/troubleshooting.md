---
title: Troubleshooting
layout: default
---

Some common problems that people run into when using Lookbook.

If you are running into problems and nothing here is relevant then head over to the [Lookbook repo]({{ site.data.external.lookbook.github.home }}) and open an issue or discussion to get help from the community.

## 🚨 Forking servers - changes not showing up

Lookbook does not play nicely when using a forking server such as Puma in [clustered mode](https://github.com/puma/puma#clustered-mode) (i.e. with a `WEB_CONCURRENCY` value of > 1). This is due to a [limitation of the underlying library](https://github.com/allmarkedup/lookbook/issues/98#issuecomment-1253796251) that is used to watch for changes.

If running in clustered mode, any changes made to preview files or components will not appear in Lookbook without restarting the server.

**This can be fixed** by setting `WEB_CONCURRENCY=1` so that the server does not run in clustered mode. Not always the best solution but there is no other way around this issue at the current time.

