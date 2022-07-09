---
layout: default
title: Display Options
---

Often it's desirable to be able to customise the way a component is displayed when it is rendered in a preview.
For example, some components may need to be rendered on a dark background, and some on a light one.

To help solve this, the `@display` tag lets you pass custom parameters to your [preview layout](https://viewcomponent.org/guide/previews.html#layouts) on a per-example basis,
and you can then add whatever logic you need into your layout to handle each case.

{%= note :info do %}
By default ViewComponent will use your regular application layout for displaying the rendered example. However it's often better to create a seperate layout that you can customise and use specifically for previewing your components. See the ViewComponent [preview docs](https://viewcomponent.org/guide/previews.html) for instructions on how to set that up.
{% end %}

{{toc}}

## Basic example

Add key/value pairs of display data using the `@display` comment tag:

```ruby
# @display bg_color "#eee"
class FooComponentPreview < ViewComponent::Preview
  # @display wrapper true
  # @display max_width 500px
  def default
    # ...
  end
end
```

Display param values can then be accessed via the `params` hash in your preview layout using `params[:lookbook][:display][<key>]`:

```html
<!DOCTYPE html>
<html style="background-color: <%= params[:lookbook][:display][:bg_color] %>">
  <head>
    <title>Preview Layout</title>
  </head>
  <body>
    <div style="max-width: <%= params[:lookbook][:display][:max_width] || '100%' %>">
      <% if params[:lookbook][:display][:wrapper] == true %>
      <div class="wrapper"><%= yield %></div>
      <% else %> <%= yield %> <% end %>
    </div>
  </body>
</html>
```

## Display tag format

The `@display` tag can be applied at the preview (class) or at the example (method) level, and takes the following format:

```ruby
@display <key> <value>
```

- `<key>` must be a valid Ruby hash key name, without quotes or spaces
- `<value>` will be parsed using the [Ruby YAML parser](https://yaml.org/YAML_for_ruby.html) to resolve the value


{%= note :info do %}
Ruby YAML does not (generally) require quoting of string values. However in some cases it _is_ required due to the presence of [indicator characters](https://yaml.org/YAML_for_ruby.html#indicators_in_strings) (such as `#`, `:` etc) - hence why the hex color code in the example above is surrounded by quotes. It's perfectly ok to quote all string values if you prefer.
{% end %}


Any `@display` params set at the preview (class) level with be merged with those set on individual example methods.

## Global display params

Global (fallback) display params can be defined via a [configuration option](/api/config/#preview_display_params):

```ruby
# config/application.rb
config.lookbook.preview_display_params = { bg_color: '#fff', max_width: '100%' }
```

Globally defined display params will be available to all previews.
Any preview or example-level `@display` values with the same name will take precedence and override a globally-set one.