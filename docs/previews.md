## Previews

You don't need to do anything special to see your ViewComponent previews and examples in Lookbook - just create them as normal and they'll automatically appear in the Lookbook UI. Preview templates, custom layouts and even bespoke [preview controllers](https://viewcomponent.org/guide/previews.html#configuring-preview-controller) should all work as you would expect.

> If you are new to ViewComponent development, checkout the ViewComponent [documentation](https://viewcomponent.org/guide/) on how to get started developing your components and [creating previews](https://viewcomponent.org/guide/previews.html).

### Annotating preview files

Lookbook parses [Yard-style comment tags](https://rubydoc.info/gems/yard/file/docs/Tags.md) in your preview classes to customise and extend the standard ViewComponent preview experience:

```ruby
# @label Basic Button
# @display bg_color "#fff"
class ButtonComponentPreview < ViewComponent::Preview

  # Primary button
  # ---------------
  # This is the button style you should use for most things.
  #
  # @label Primary
  def default
    render ButtonComponent.new do
      "Click me"
    end
  end

  # Button with icon
  # ----------------
  # This example uses dynamic preview parameters
  # which can be edited live in the Lookbook UI
  #
  # @param text
  # @param icon select [heart, cog, alert]
  def icon(text: "Spread the love", icon: "heart")
    render ButtonComponent.new(icon: icon) do
      text
    end
  end

  # Inverted button
  # ---------------
  # For light-on-dark screens
  #
  # @display bg_color "#000"
  def secondary
    render ButtonComponent.new(style: :inverted) do
      "Click me"
    end
  end

  # Unicorn button
  # ---------------
  # This button style is still a **work in progress**.
  #
  # @hidden
  def secondary
    render ButtonComponent.new do
      "Click me"
    end
  end

  # @!group More examples

  def short_text
    render ButtonComponent.new do
      "Go"
    end
  end

  def long_text
    render ButtonComponent.new do
      "Click here to do this thing because it's the best way to do it"
    end
  end

  def emoji_text
    render ButtonComponent.new do
      "👀📗"
    end
  end

  # @!endgroup

end
```

**Tags** are just strings identified by their `@` prefix - for example `@hidden`. Tags are always placed in a comment above the relevant preview class or example method.

The following Lookbook-specific tags are available for use:

- [`@label`](#label-tag)
- [`@display`](#display-tag)
- [`@!group ... @!endgroup`](#group-tag)
- [`@hidden`](#hidden-tag)
- [`@param`](#param-tag)

<h3 id="label-tag">🏷 @label</h3> 

Used to replace the auto-generated navigation label for the item with `<text>`.

```ruby
@label <text>
```

> Available for preview classes & example methods.

```ruby
# @label Preview Label
class FooComponentPreview < ViewComponent::Preview
  # @label Example Label
  def default
  end
end
```

<h3 id="display-tag">🏷 @display</h3>

The `@display` tag lets you pass custom parameters to your preview layout so that the component preview can be customised on a per-example basis.

```ruby
# @display bg_color "#eee"
class FooComponentPreview < ViewComponent::Preview
  # @display wrapper true # @display max_width 500px
  def default
  end
end
```

The `@display` tag can be applied at the preview (class) or at the example (method) level, and takes the following format:

```ruby
@display <key> <value>
```

- `<key>` must be a valid Ruby hash key name, without quotes or spaces
- `<value>` will be parsed using the [Ruby YAML parser](https://yaml.org/YAML_for_ruby.html) to resolve the value

> Note: Ruby YAML does not (generally) require quoting of string values. However in some cases it _is_ required due to the presence of [indicator characters](https://yaml.org/YAML_for_ruby.html#indicators_in_strings) (such as `#`, `:` etc) - hence why the hex color code in the example above is surrounded by quotes. It's perfectly ok to quote all string values if you prefer.

These display parameters can then be accessed via the `params` hash in your preview layout using `params[:lookbook][:display][<key>]`:

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

> By default ViewComponent will use your default application layout for displaying the rendered example. However it's often better to create a seperate layout that you can customise and use specifically for previewing your components. See the ViewComponent [preview docs](https://viewcomponent.org/guide/previews.html) for instructions on how to set that up.

Any `@display` params set at the preview (class) level with be merged with those set on individual example methods.

#### Global display params

Global (fallback) display params can be defined via a configuration option:

```ruby
# config/application.rb
config.lookbook.preview_display_params = { bg_color: '#fff', max_width: '100%' }
```

Globally defined display params will be available to all previews. Any preview or example-level `@display` values with the same name will take precedence and override a globally-set one.

<h3 id="group-tag">🔖 `@!group ... @!endgroup`</h3>

For smaller components, it can often make sense to render a set of preview examples in a single window, rather than representing them as individual items in the navigation which can start to look a bit cluttered.

You can group a set of examples by wrapping them in `@!group <name>` / `@!endgroup` tags within your preview file:

```ruby
class HeaderComponentPreview < ViewComponent::Preview
  def standard
    render Elements::HeaderComponent.new do
      'Standard header'
    end
  end

  # @!group Sizes

  def small
    render Elements::HeaderComponent.new(size: 12) do
      'Small header'
    end
  end

  def medium
    render Elements::HeaderComponent.new(size: 16) do
      'Small header'
    end
  end

  def big
    render Elements::HeaderComponent.new(size: 24) do
      'Small header'
    end
  end

  # @!endgroup
end
```

The example above would display the `Sizes` examples grouped together on a single page, rather than as indiviual items in the navigation:

<img src="../.github/assets/nav_group.png">

You can have as many groups as you like within a single preview class, but each example can only belong to one group.

<h3 id="hidden-tag">🏷 `@hidden`</h3>

Used to temporarily exclude an item from the Lookbook navigation. The item will still be accessible via it's URL.

Can be useful when a component (or a variant of a component) is still in development and is not ready to be shared with the wider team.

> Available for both preview classes & example methods.

```ruby
# @hidden
class FooComponentPreview < ViewComponent::Preview
  # @hidden
  def default; end
end
```

<h3 id="param-tag">@param</h3>

The `@param` tag provides the ability to specify **editable preview parameters** which can be changed in the Lookbook UI in order to customise the rendered output on the fly, much like the [Controls (knobs) addon](https://storybook.js.org/addons/@storybook/addon-controls) for Storybook.

Each `@param` will have an associated form field generated for it. The values for each field will be handled as [dynamic preview params](https://viewcomponent.org/guide/previews.html#:~:text=It%E2%80%99s%20also%20possible%20to%20set%20dynamic%20values%20from%20the%20params%20by%20setting%20them%20as%20arguments%3A) when rendering the example.

The `@param` tag takes the following format:

```ruby
@param <name> <input_type> <opts?>
```

- `<name>` - name of the dynamic preview param
- `<input_type>` - input field type to generate in the UI
- `<opts?>` - YAML-encoded field options (or [path to a JSON file of options](#json-param-options)), used for some field types

#### Input types

The following **input field types** are available for use:

📝 **Text-style inputs** - Single line fields, useful for short strings of text or numbers.

```ruby
@param <name> text
@param <name> email
@param <name> number
@param <name> url
@param <name> tel
```

> The above types only differ in the validation constraints they impose on the input field.

📝 **Textarea** - Multi-line textarea field for longer-form content.

```ruby
@param <name> textarea
```

📝 **Select box** - Dropdown select field for selecting from a list of known options.

```ruby
@param <name> select <options>
```

`<options>` should be a [YAML array](https://yaml.org/YAML_for_ruby.html#simple_inline_array) of options which must be formatted in the same style as the input for Rails' [`options_for_select`](https://apidock.com/rails/v6.0.0/ActionView/Helpers/FormOptionsHelper/options_for_select) helper:

```ruby
# Basic options:
# @param theme select [primary, secondary, danger]

# With custom labels (each item itself an array of [label, value]):
# @param theme select [[Primary theme, primary], [Secondary theme, secondary], [Danger theme, danger]]

# With empty option (`~` in YAML)
# @param theme select [~, primary, secondary, danger]
```

> **Note**: In most cases YAML does not require quoting of strings, however if you are running into issues check out the [Ruby YAML docs](https://yaml.org/YAML_for_ruby.html) for a complete syntax reference.

📝 **Toggle** - On/off switch for toggling boolean values.

```ruby
@param <name> toggle
```

<h4 id="json-param-options"> Using a JSON file for param options</h4>

In some cases, where there are a lot of potential options (such as a list of icons for an icon component) it can make sense to store that data in a JSON file instead of trying to fit it all in one huge comment.

It is possible to import JSON data from a file by providing a path as the `options` argument in the `@param` tag:

```ruby
# @param theme select data/theme-select-data.json
```

Files **must** have a `.json` extension, and by default paths are resolved relative to the application root directory.

However, if the path starts with `./` or `../` then the path will be \*\*resolved relative to the current preview file. For example:

```ruby
# @param theme select ./theme-select-data.json
# @param theme select ../data/theme-select-data.json
```

#### Default values

Default values are specified as part of the preview example method parameters in the usual Ruby way:

```ruby
def button(content: 'Click me', theme: 'primary', arrow: false)
  # ...
end
```

These will be used as the default values for the param fields.

> Note that the default values are **not** evaluated at runtime, so you cannot use method calls to generate the defaults. Only static default values are supported.

#### Type casting values

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

#### Full example:

```ruby
class ButtonComponentPreview < ViewComponent::Preview
  # The params defined below will be editable in the UI:
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

<img src="../.github/assets/dynamic_params.png">

### Adding notes

All comment text other than tags will be treated as markdown and rendered in the **Notes** panel for that example in the Lookbook UI.

```ruby
# @hidden
class ProfileCardComponentPreview < ViewComponent::Preview 

  # Profile Card
  # ------------
  # Use the default profile card component whenever you need to represent a user.
  #
  # All this text will be included in the Notes panel for the component.
  def default
  end
end
```

Notes text will be rendered using the Markdown parser so you can use all the normal Markdown syntax.

---

**Next:** [Documentation pages &rarr;](pages.md)