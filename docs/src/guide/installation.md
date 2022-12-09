---
title: Installation
layout: default
---

These instructions cover installing Lookbook in your project for the first time. If you are already using Lookbook then head over to the [upgrade guide](/guide/upgrading) instead for details on how to update to the latest version. 

## 1. Install the Lookbook gem

Add Lookbook to your `Gemfile`:

```ruby
group :development do
  gem "lookbook"
end
```

And then `bundle install` to install Lookbook.

{%= note :info do %}
  Lookbook can also be run in production - see [the deployment docs](/guide/deployment) for more information.
{% end %}

## 2. Mount Lookbook in your app

Next mount the Lookbook engine at a path of your choosing in your `config/routes.rb` file:

```ruby
Rails.application.routes.draw do
  if Rails.env.development?
    mount Lookbook::Engine, at: "/lookbook"
  end
end
```

## 3. Install optional dependencies

Lookbook requires the `listen` and `actioncable` gems to enable live-updating of the UI when changes are made to component or preview files.

These are optional dependencies - if they are not present the only difference is that you will need to manually refresh the UI to see the changes.

Many Rails apps already include these gems. If your project doesn't you can enable Lookbook live UI updates by including them in the `:development` group in your `Gemfile`:

```ruby
group :development do
  gem "listen"
  gem "actioncable"
end
```

No additional configuration is needed once they are installed - Lookbook will detect they are present and enable live updates automatically.

{{toc}}

