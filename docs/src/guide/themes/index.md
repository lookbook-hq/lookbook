---
layout: default
title: Overview
---

Lookbook provides some basic UI color theming options to help customise your Lookbook instance.

You can pick a base theme from the set provided and then optionally [customise it further](/guide/themes/customisation/) to better fit in with the look of your project.

## Bundled themes

Lookbook ships with a small number of pre-defined UI color themes:

{%= options_list do |list| %}
  {% list.option name: "indigo" do %}
    Indigo theme (default)
  {% end %}
  {% list.option name: "blue" do %}
    Blue theme
  {% end %}
  {% list.option name: "zinc" do %}
    Zinc (gray) theme
  {% end %}
{% end %}

You can use the theme of your choosing by setting the `ui_theme` [config option](/api/config/#config-option-ui-theme):

```ruby
# config/application.rb
config.lookbook.ui_theme = "blue"
```

## Screenshots

### Indigo (default):

{{ image "theme_indigo.png" }}

### Blue:

{{ image "theme_blue.png" }}

### Zinc:

{{ image "theme_zinc.png" }}

