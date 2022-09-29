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
@param <name> <input_type> <description?> <opts?>
```

{%= options_list do |list| %}
  {% list.option name: "<name>" do %}
    Name of the preview param (should match example method argument key)
  {% end %}
  {% list.option name: "<input_type>" do %}
    Input field type to generate in the UI
  {% end %}
  {% list.option name: "<description?>" do %}
    Optional short description of what the param is used for, supplied as a double-quoted string.
  {% end %}
  {% list.option name: "<opts?>" do %}
    Optional hash of options for customising the field display. See the [param options section](#param-options) for more info.
  {% end %}
{% end %}  


```ruby
class ButtonComponentPreview < ViewComponent::Preview
  # @param arrow toggle
  # @param theme select { choices: [primary, secondary, danger] }
  # @param content text "The text to display in the button"
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

Dropdown select field for selecting from a list of known items.

```ruby
@param <name> select <opts>
```

```ruby
# Basic options:
# @param theme select { choices: [primary, secondary, danger] }

# With custom labels (each item itself an array of [label, value]):
# @param theme select { choices: [[Primary theme, primary], [Secondary theme, secondary], [Danger theme, danger]] }

# With empty option (`~` in YAML)
# @param theme select { choices: [~, primary, secondary, danger] }
```

### 📝 Toggle

On/off switch for toggling boolean values.

```ruby
@param <name> toggle
```

## Options
{: #param-options}

`@param` options provide a way to further customise the display of each field in the Lookbook UI.

See the [options reference section](#options-reference) for details of available options. Any 'unknown' options will be used to generate HTML attributes for the relevant input element.

Options can be [provided inline](#inline-options) (in YAML hash format), [dynamically generated](#dynamic-options) via a preview class instance method or [loaded from a file](#file-options).

```ruby
# Inline:
# @param theme select { choices: [primary, secondary, danger] }

# Dynamic:
# @param theme select :name_of_method_that_returns_options

# File:
# @param theme select ./path/to/options.yml
```

Note that the options hash, method or file reference should always be placed at the very end of the `@param` tag annotation.

### Inline options

The simplest way to specify options for a param field is to hard-code it as a YAML-formatted hash. For example, as in the case for the list of `select` options in the example below:

```ruby
# @param theme select { choices: [primary, secondary, danger] }
```

This is straightforward and useful for simple cases, but if you have a long list of choices or you want to reference values elsewhere to prevent duplication then hard-coding the data might not be the ideal solution

### Dynamic options <small>(since v1.1)</small>
{: #dynamic-options}

To clean up `@param` tags you can use a private method (in your preview class) that returns a hash of param options, and reference it via it's symbolized name:

```ruby
# @param theme select :method_that_returns_options
```

Note that you cannot pass any arguments to the method.

{% raw %}
```ruby
class ButtonComponent::Preview < ViewComponent::Preview
  # @param theme select :theme_options
  def button(theme: :danger)
    # ...
  end

  private

  def theme_options
    {
      choices: %i[primary secondary danger],
      include_blank: true
    }
  end
end
```
{% endraw %}

Dynamic options depend on **runtime code evaluation** and require enabling in your config before they can be used:

```rb
config.lookbook.preview_params_options_eval = true
```

{%= note :info do %}
Use of `eval` to evaluate arbitrary strings can be a security concern. However Lookbook never `eval`'s _any_ user-inputed content - only comments added to the source code itself.
{% end %}

### File options

It is possible to import YAML/JSON data from a file by providing the file path:

```ruby
# @param theme select data/theme-select-data.yml
```

```yml
# data/theme-select-data.yml
choices:
  - primary
  - secondary
  - danger
```

Files **must** have a `.json` or `.yml` extension, and by default paths are resolved relative to the application root directory.

However, if the path starts with `./` or `../` then the path will be **resolved relative** to the current preview file. For example:

```ruby
# @param theme select ./theme-select-data.json
# @param theme select ../data/theme-select-data.json
```

### Options reference

All of the below options are optional, although specific inputs may require or rely on additional options (such as the `choices` option for select inputs).

{%= options_list do |list| %}
  {% list.option name: "label" do %}
    Custom label text
  {% end %}
  {% list.option name: "description" do %}
    Short description of what the param is used for. An alternative to providing the description in the main body of the annotation.
  {% end %}
  {% list.option name: "hint" do %}
    Help text. Displayed as a tooltip when hovering over a '?' icon next to the label.
  {% end %}
{% end %}

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

To help with this, a `type` can be specified in the `@param` definition to automatically cast the dynamic value to a different type:

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

