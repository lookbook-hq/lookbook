---
layout: default
title: Theming
---

Lookbook provides some basic UI color theming options to help you personalise your Lookbook instance.

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

**Indigo (default):**

{{ image "theme_indigo.png" }}

**Blue:**

{{ image "theme_blue.png" }}

**Zinc:**

{{ image "theme_zinc.png" }}


## Theme customisation

It is possible to further customise your chosen **base theme** by overriding some (or all) of the color variables values used in the themes.

You can do this using the `ui_theme_overrides` [config option](/api/config/#config-option-ui-theme-overrides):

```ruby
# config/application.rb
config.lookbook.ui_theme_overrides = {
  header_bg: "#ff69b4", # hotpink
  nav_icon_stroke: "rebeccapurple"
}
```

### Available color variables

The following variables can be overridden in your application config:

{%= options_list do |list| %}
  {% site.data.theme_variables.group_by { |var| var[:group] }.each_with_index do |(key, vars), i| %}
    {% vars.each do |var| %}
      {% list.option name: var[:name] do %}
        {{ var[:description] }}
      {% end %}
    {% end %}
    {% unless i == vars.size - 1 %}
      {% list.option :divider %}
    {% end %}    
  {% end %}
{% end %}

### Using color scales

Alternatively, you can supply base & accent colour scales and Lookbook will attempt to use the most appropriate shade for each piece of UI.

The Tailwind website has [a great color scale reference](https://tailwindcss.com/docs/customizing-colors) and the majority of color scales
defined there will work well with the Lookbook theme system.

To use color scales, you will need to override the color value for each shade in the scale:

```ruby
# Emerald colour scheme (https://tailwindcss.com/docs/customizing-colors#:~:text=%2314532d-,Emerald,-50)
config.lookbook.ui_theme_overrides = {
  accent_50: "#ecfdf5",
  accent_100: "#d1fae5",
  accent_200: "#a7f3d0",
  accent_300: "#6ee7b7",
  accent_400: "#34d399",
  accent_500: "#10b981",
  accent_600: "#059669",
  accent_700: "#047857",
  accent_800: "#065f46",
  accent_900: "#064e3b",
}
```

{{ image "theme_custom_emerald.png" }}

{%= note :info do %}
If you are happy with the `base` color scale, there is no need to redefine it - the default gray scale should work well for most themes.
{% end %}

And you can always override a specific color variable too once you have defined your own scale:

```ruby
# Emerald colour scheme (https://tailwindcss.com/docs/customizing-colors#:~:text=%2314532d-,Emerald,-50)
config.lookbook.ui_theme_overrides = {
  accent_50: "#ecfdf5",
  # ... other color scale colors ...

  header_bg: "red", # and then override a specific color variable
}
```

### Color scale variables

{%= options_list do |list| %}
  {% list.option name: "base-50" do %}
    Lightest base color shade
  {% end %}
  {% list.option name: "base-100" do %}
    ...
  {% end %}
  {% list.option name: "base-200" do %}
    ...
  {% end %}
  {% list.option name: "base-300" do %}
    ...
  {% end %}
  {% list.option name: "base-400" do %}
    ...
  {% end %}
  {% list.option name: "base-500" do %}
    ...
  {% end %}
  {% list.option name: "base-600" do %}
    ...
  {% end %}
  {% list.option name: "base-700" do %}
    ...
  {% end %}
  {% list.option name: "base-800" do %}
    ...
  {% end %}
  {% list.option name: "base-900" do %}
    Darkest base colour shade
  {% end %}

  {% list.option :divider %}

  {% list.option name: "accent-50" do %}
    Lightest accent color shade
  {% end %}
  {% list.option name: "accent-100" do %}
    ...
  {% end %}
  {% list.option name: "accent-200" do %}
    ...
  {% end %}
  {% list.option name: "accent-300" do %}
    ...
  {% end %}
  {% list.option name: "accent-400" do %}
    ...
  {% end %}
  {% list.option name: "accent-500" do %}
    ...
  {% end %}
  {% list.option name: "accent-600" do %}
    ...
  {% end %}
  {% list.option name: "accent-700" do %}
    ...
  {% end %}
  {% list.option name: "accent-800" do %}
    ...
  {% end %}
  {% list.option name: "accent-900" do %}
    Darkest accent colour shade
  {% end %}
{% end %}

{%= note :info do %}
Themes often work best when the base colour is a type of gray, with the accent a brighter, more vibrant color.
{% end %}

{{toc}}