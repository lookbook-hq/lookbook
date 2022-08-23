---
layout: default
title: Deploying to Production
---

Lookbook is intended to be a tool for aiding the ViewComponent development process, and so is usually restricted to running only when the app is in `development` mode.

However, it is possible to run Lookbook in a production environment if you wish.

## Differences between development and production

By default, Lookbook will behave a little differently in production than it does in development:

1. Watching files for changes is **disabled**
2. Parsing preview files for annotations does **not** happen at automatically at runtime. Instead the preview files must be pre-parsed via a Rake task before starting the app (much like asset precompilation).

## Pre-parsing preview files

Run the following command to pre-parse the preview files annotations:

```
rake lookbook:previews:preparse
```

If you wish to run this as part of your existing assets precompilation step, you can add the following into your app's `Rakefile`:

```ruby
if Rails.env.production?
  Rake::Task['assets:precompile'].enhance do
    Rake::Task["lookbook:previews:preparse"].invoke
  end
end
```

The pre-parsing of preview files will then take place every time `rake assets:precompile` is called and so will not need to be run separately.

## Configuration changes for production

You will also need to make sure that the following configuration changes have been made when deploying to production:

**Ensure ViewComponent is [configured to show previews in production](https://viewcomponent.org/api.html#show_previews)** (by default it is disabled when not in development):

```ruby
# config/environments/production.rb
config.view_component.show_previews = true
```

**Remove any environment checking from around the Lookbook mounting declaration** (if added as per install instructions):

```ruby
# config/routes.rb
Rails.application.routes.draw do
  # if Rails.env.development? <- remove
    mount Lookbook::Engine, at: "/lookbook"
  # end
end
```

## Overriding production default behaviours

If for some reason you wish to enable file watching or runtime preview annotation parsing in production, you can always override the default behaviour using thie following config options:

```ruby
# config/environments/production.rb

# enable file-change listening
config.lookbook.listen = true

# enable runtime preview parsing
config.lookbook.runtime_parsing = true
```

{{toc}}