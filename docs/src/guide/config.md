---
layout: default
title: Configuration
---

Lookbook uses your ViewComponent config so it normally doesn't need any additional configuration to know where to look for your components and preview classes etc. However there are a number of Lookbook-specific configuration options that you may want to use.

{{ toc }}

## Configuring Lookbook

You can add Lookbook configuration in your `config/application.rb` file, an initializer or anywhere else you handle your Rails app configuration.

```ruby
# config/application.rb
module MyApp
  class Application < Rails::Application
    # other app config...
    config.lookbook.project_name = "Lookbook Demo"
  end
end
```

## Common Options

Below are a few of the most commonly used configuration options. For the complete list of options check out the [configuration API docs](/api/config).

{% common_config = [:project_name, :debug_menu, :ui_theme] %}
{% options = site.data.config_options.filter { |c| common_config.include?(c.name.to_sym) } %}
{{ render "config_options_list", options: options }}

[Full list of configuration options &rarr;](/api/config)
