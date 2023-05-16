---
id: previews-params
title: Dynamic Params
---

<%= render section(overview: true) do |s| %>  
  <% s.with_block_prose do %>
    You can set dynamic values from URL parameters by setting them as arguments:

    ```rb
    # test/components/previews/example_component_preview.rb
    class ExampleComponentPreview < Lookbook::Preview
      def with_dynamic_title(title: "Example component default")
        render(ExampleComponent.new(title: title))
      end
    end
    ```

    And then supplying the values via URL parameters:
    
    ```
    /lookbook/inspect/example/with_dynamic_title?title=Custom+title
    ```

    However manually updating the URL is not very user-friendly or discoverable so Lookbook lets you configure **editable preview parameters** using the `@param` tag.

    These generate form controls to allow param values to be changed on-the fly from right within the Lookbook UI,
    much like the [Controls (knobs) addon](https://storybook.js.org/addons/@storybook/addon-controls) for Storybook. 
  <% end %>

  <% s.with_block_screenshot "guide/params_editor.gif", "Live-editing preview params" %>

<% end %>

<%= render section("A basic example", id: "example") do |s| %>
  <% s.with_block_prose do %>
    Add a `@param` tag to tell Lookbook to generate a form field for a method argument:

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

    In ths example the editable text field will appear under the 'Params' tab in the preview inspector. Editing the text in this field will re-render the preview with the new content:
  <% end %>
<% end %>

<%= render section("Param tag format", id: "example") do |s| %>
  <% s.with_block_prose do %>
    The `@param` tag takes the following format:

    ```ruby
    @param <name> <input_type> <description?> <opts?>
    ```    
  <% end %>

  <% s.with_block_options_list options: [
    {
      name: "<name>",
      types: "String",
      text: "Name of the preview param (should match example method argument key)"
    },
    {
      name: "<input_type>",
      types: "String",
      text: "Input field type to generate in the UI"
    },
    {
      name: "<description>",
      types: "String",
      text: "Optional short description of what the param is used for, supplied as a double-quoted string."
    },
    {
      name: "<opts?>",
      types: "String",
      text: "Optional hash of options for customising the field display. See the [param options section](#param-options) for more info."
    },
  ] %>

  <% s.with_block_prose do %>
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
  <% end %>
<% end %>

<%= render section("Input types", id: "input-types") do |s| %>
  <% s.with_block_prose do %>
    The available input field types are listed below.
  <% end %>

  <% s.with_block_note :tip do %>
    If you require a type of input that is _not_ provided by Lookbook (or wish to override an existing one) then you
    can also [add your own custom inputs](<%= extend_url :inputs %>) quickly and easily. 
  <% end %>

  <% s.with_block_subheading "Text-style inputs", id: "text" %>
  <% s.with_block_prose do %>
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
  <% end %>

  <% s.with_block_subheading "Textarea", id: "textarea" %>
  <% s.with_block_prose do %>
    Multi-line textarea field for longer-form content.

    ```ruby
    @param <name> textarea
    ```
  <% end %>

  <% s.with_block_subheading "Select box", id: "select" %>
  <% s.with_block_prose do %>
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
  <% end %>

  <% s.with_block_subheading "Toggle", id: "toggle" %>
  <% s.with_block_prose do %>
    On/off switch for toggling boolean values.

    ```ruby
    @param <name> toggle
    ```
  <% end %>

  <% s.with_block_subheading "Color", id: "color" %>
  <% s.with_block_prose do %>    
    Color picker input. Provides a six-letter hex code in the format `#ff0000`.

    ```ruby
    @param <name> color
    ```
  <% end %>

  <% s.with_block_subheading "Range", id: "range" %>
  <% s.with_block_prose do %>    
    Range slider input. `min`, `max` and `step` values should be provided via the [options hash](#param-options).

    ```ruby
    @param <name> range { min: 0, max: 10, step: 1 }
    ```
  <% end %>
<% end %>

<%= render section("Options", id: "param-options") do |s| %>
  <% s.with_block_prose do %>
    `@param` options provide a way to further customise the display of each field in the Lookbook UI.

    See the [options reference section](#options-reference) for details of available options. Any 'unknown' options will be used to generate HTML attributes for the relevant input element.

    Options can be [provided inline](#inline-options) (in YAML hash format), [dynamically generated](#dynamic-options) via a preview class instance method or evaluated Ruby statement, or [loaded from a file](#file-options).

    ```ruby
    # Inline:
    # @param theme select { choices: [primary, secondary, danger] }

    # Dynamic - method reference:
    # @param theme select :name_of_method_that_returns_options

    # Dynamic - evaluated Ruby statement:
    # @param theme select {{ FooComponent::OPTIONS }}

    # File:
    # @param theme select ./path/to/options.yml
    ```

    Note that the options hash, method or file reference should always be placed at the very end of the `@param` tag annotation.
  <% end %>

  <% s.with_block_subheading "Inline options", id: "inline-options" %>
  <% s.with_block_prose do %>    
    The simplest way to specify options for a param field is to hard-code it as a YAML-formatted hash. For example, as in the case for the list of `select` options in the example below:

    ```ruby
    # @param theme select { choices: [primary, secondary, danger] }
    ```

    This is straightforward and useful for simple cases, but if you have a long list of choices or you want to reference values elsewhere to prevent duplication then hard-coding the data might not be the ideal solution
  <% end %>

  <% s.with_block_subheading "Dynamic options", id: "dynamic-options" %>
  <% s.with_block_prose do %>    
    For more flexibility it is possible to generate the options hash dynamically from Ruby code.

    #### Using a method

    You can use a private method (in your preview class) that returns a hash of param options, and reference it via its symbolized name:

    ```ruby
    # @param theme select :method_that_returns_options
    ```

    Note that you cannot pass any arguments to the method.

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
 
    #### Using a Ruby statement

    For maximum flexibility it is also possible to evaluate arbitrary Ruby statements to generate the options.

    The statement must be placed within double curly brackets and will be evaluated in the context of the current preview class, as with the method reference technique above.


    ```ruby
    # @param theme select {{ ButtonComponent::THEMES }}
    ```
  <% end %>

  <% s.with_block_subheading "File options", id: "file-options" %>
  <% s.with_block_prose do %> 
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
  <% end %>


  <% s.with_block_subheading "Options reference", id: "options-reference" %>
  <% s.with_block_prose do %>    
    All of the below options are optional, although specific inputs may require or rely on additional options (such as the `choices` option for select inputs).
  <% end %>  
  <% s.with_block_options_list options: [
    {
      name: "label",
      types: "String",
      text: " Custom label text"
    },
    {
      name: "description",
      types: "String",
      text: "Short description of what the param is used for. An alternative to providing the description in the main body of the annotation."
    },
    {
      name: "hint",
      types: "String",
      text: "Help text. Displayed as a tooltip when hovering over a '?' icon next to the label."
    }
  ] %>
<% end %>

<%= render section("Default values", id: "default-values") do |s| %>
  <% s.with_block_prose do %>
    Default values are specified as part of the preview example method parameters in the usual Ruby way:

    ```ruby
    def button(content: 'Click me', theme: 'primary', arrow: false)
      # ...
    end
    ```

    These will be used as the default values for the param fields.
  <% end %>
<% end %>

<%= render section("Type casting values", id: "type-casting") do |s| %>
  <% s.with_block_prose do %>

    Most dynamic param values are passed to the example method as strings, with the following exceptions:

    * `toggle` input - values are cast to booleans
    * `number` input - values are cast to integers

    In some cases, you may want to type cast the parameter value to something else (for example a `Symbol`) before using it when initializing the component.

    To help with this, a `type` can be specified in the `@param` definition to automatically cast the dynamic value to a different type.

    The type can **either** be provided in the body of the `@param` tag, surrounded by square brackets:

    ```ruby
    # @param <name> [<type>] <input_type> <opts?>
    ```

    **or** as the value of the `value_type` key in the param options:

    ```ruby
    # @param <name> <input_type> { value_type: "<type>" }
    ```

    Both examples below are equivalent, and the value of the `theme` param (by default a string) will be automatically cast to a Symbol, ready for use in instantiating the component.

    ```ruby
    # @param theme [Symbol] select { choices: [primary, secondary, danger] }
    def default(theme: :primary)
      render Elements::ButtonComponent.new(theme: theme) do
        'Click me'
      end
    end

    # @param theme select { choices: [primary, secondary, danger], value_type: "Symbol" }
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

  <% end %>
<% end %>


<% if false %>







<% end %>
