---
layout: default
title: Dynamic Params
---

Lookbook builds on ViewComponent's [dynamic preview values](https://viewcomponent.org/guide/previews.html#passing-parameters) functionality
to provide the ability to specify **editable preview parameters**. These can be changed by the end user in the Lookbook UI in order to customise
rendered preview output on the fly, much like the [Controls (knobs) addon](https://storybook.js.org/addons/@storybook/addon-controls) for Storybook.

{{toc}}

## A basic example

We can create a preview with editable text by adding an argument to the preview example method, using the value of that argument when rendering our component
and then adding a `@param` comment tag to tell Lookbook to generate a form field in the UI so it can be edited:

```ruby
class HeaderComponentPreview < ViewComponent::Preview
  # @param text
  def default(text: "Some header text")
    render Elements::HeaderComponent.new do
      text
    end
  end
end
```

The editable text field will appear under the 'Params' tab in the preview inspector. Editing the text in this field will re-render the preview with the new content:

{{ image "editable_preview_param.gif", class: "screenshot" }}

## Param tag format

The `@param` tag takes the following format:

```ruby
@param <name> <input_type> <opts?>
```

{%= options_list do |list| %}
  {% list.option name: "<name>" do %}
    Name of the preview param (should match example method argument key)
  {% end %}
  {% list.option name: "<input_type>" do %}
    Input field type to generate in the UI
  {% end %}
  {% list.option name: "<opts?>" do %}
    YAML-encoded field options (or [path to a JSON file of options](#json-param-options)), used for some field types
  {% end %}
{% end %}  


```ruby
class ButtonComponentPreview < ViewComponent::Preview
  # @param arrow toggle
  # @param theme select [primary, secondary, danger]
  # @param content text #
  def default(content: 'Click me', theme: 'primary', arrow: true)
    render Elements::ButtonComponent.new(theme: theme, arrow: arrow) do
      content
    end
  end
end
```

## Input types

The following input field types are available for use:

### 📝 Text-style inputs

Single line fields, useful for short strings of text or numbers.

```ruby
@param <name> text
@param <name> email
@param <name> number
@param <name> url
@param <name> tel
@param <name> date
@param <name> datetime-local
```

{%= note :info do %}
The above types only differ in the validation constraints they impose on the input field.
{% end %}

### 📝 Textarea

Multi-line textarea field for longer-form content.

```ruby
@param <name> textarea
```

### 📝 Select box

Dropdown select field for selecting from a list of known options.

```ruby
@param <name> select <options>
```

{%= options_list do |list| %}
  {% list.option name: "<options>" do %}
    A [YAML array](https://yaml.org/YAML_for_ruby.html#simple_inline_array) of options which must be formatted in the same style as the input for Rails' [`options_for_select`](https://apidock.com/rails/v6.0.0/ActionView/Helpers/FormOptionsHelper/options_for_select) helper.
  {% end %}
{% end %}  


```ruby
# Basic options:
# @param theme select [primary, secondary, danger]

# With custom labels (each item itself an array of [label, value]):
# @param theme select [[Primary theme, primary], [Secondary theme, secondary], [Danger theme, danger]]

# With empty option (`~` in YAML)
# @param theme select [~, primary, secondary, danger]
```

{%= note :info do %}
In most cases YAML does not require quoting of strings, however if you are running into issues check out the [Ruby YAML docs](https://yaml.org/YAML_for_ruby.html) for a complete syntax reference.
{% end %}

### 📝 Toggle

On/off switch for toggling boolean values.

```ruby
@param <name> toggle
```

## Importing param options from a JSON file
{: #json-param-options}

In some cases, where there are a lot of potential options (such as a list of icons for an icon component) it can make sense to store that data in a JSON file instead of trying to fit it all in one huge comment.

It is possible to import JSON data from a file by providing its path as the `options` argument in the `@param` tag:

```ruby
# @param theme select data/theme-select-data.json
```

Files **must** have a `.json` extension, and by default paths are resolved relative to the application root directory.

However, if the path starts with `./` or `../` then the path will be **resolved relative** to the current preview file. For example:

```ruby
# @param theme select ./theme-select-data.json
# @param theme select ../data/theme-select-data.json
```

## Default values

Default values are specified as part of the preview example method parameters in the usual Ruby way:

```ruby
def button(content: 'Click me', theme: 'primary', arrow: false)
  # ...
end
```

These will be used as the default values for the param fields.

{%= note :info do %}
Note that the default values are **not** evaluated at runtime, so you cannot use method calls to generate the defaults. Only static default values are supported.
{% end %}

## Type casting values

Most dynamic param values are passed to the example method as strings, with the following exceptions:

- `toggle` input - values are cast to booleans
- `number` input - values are cast to integers

In some cases, you may want to type cast the parameter value to something else (for example a `Symbol`) before using it when initializing the component.

To help with this, a `type` option can be specified in the `@param` definition to automatically cast the dynamic value to a different type:

```ruby
# @param <name> [<type>] <input_type> <opts?>
```

In the example below, the value of the `theme` param (by default a string) will be automatically cast to a Symbol, ready for use in instantiating the component.

```ruby
# @param theme [Symbol] select [primary, secondary, danger]
def default(theme: :primary)
  render Elements::ButtonComponent.new(theme: theme) do
    'Click me'
  end
end
```

The supported types to cast to are:

- `String` - _default for all except `toggle` inputs_
- `Boolean` - _default for `toggle` inputs_
- `Symbol`
- `Date`
- `DateTime`
- `Integer`
- `Float`

The following structured types are also available but should be considered **experimental** - you may run into bugs!

- `Hash` - _value string converted to Hash using the Ruby YAML parser_
- `Array` - _value string converted to Array using the Ruby YAML parser_

