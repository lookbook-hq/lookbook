---
layout: default
title: Upgrade Guide
---

Upgrading to **Lookbook v1.0** from an older version is straightforward.

There are no breaking changes from the **v0.9.x** releases to **v1.0** so your existing set up should not need any changes to code.

Just update the Lookbook gem version in your `Gemfile`:

```rb
gem "lookbook", ">= v{{ lookbook_version }}"
```

Then `bundle install`, start your app and that's it - you should be ready to go!

Of course if you run into any problems when upgrading then head over
to the [Github repo]({{ site.data.external.lookbook.github.home }}) and open an issue with the details and we'll try to helps as best we can.




