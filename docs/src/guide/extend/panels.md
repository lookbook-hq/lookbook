---
layout: default
title: Inspector Panels
---

The Lookbook **preview inspector** is where each preview is rendered alongside its source code, notes and more.

The inspector is made up of a number of tabbed panels, grouped into two areas - the preview area at the top (with **Preview** and **HTML** tabs)
and the drawer area at the bottom (with **Source**, **Notes**, and **Params** tabs).

{{ image "lookbook_inspector_screenshot.png" }}

It is possible to add custom tab panels into the drawer area, as well as to hide, reposition or reorder the system-provided panels.

## Adding a custom panel

You can add a custom inspector panel using the `Lookbook.define_panel` method when you configure your Lookbook installation:

```ruby
Lookbook.define_panel(<name>, <opts>)
```

{%= options_list do |list| %}
  {% list.option name: "<name>", type: "String" do %}
    A unique name for the panel
  {% end %}
  {% list.option name: "<opts>", type: "Hash" do %}
    A `Hash` of panel options ([see below](#panel-options) for details)
  {% end %}
{% end %}

For example, a very simple 'info' panel could be created as follows:

```ruby
# config/application.rb
Lookbook.define_panel(:info, {
  label: "Extra Info",
  partial: "panels/info"
})
```

```erb
<!-- views/panels/_info.html.erb -->
<div>
  <h2>Some information</h2>
  <ul>
    <li>You are looking at the '<%= preview.label %>' preview</li>
    <li>The preview file path is: '<%= preview.full_path %>'<li>
    <li>There are <%= examples.size %> examples in this preview<li>
  </ul>
</div>
```

{%= note :info do %}
Panel partial templates can be located anywhere within your app's `views` directory.
{% end %}

## Panel options

There are a number of available options when defining a panel.

{%= options_list do |list| %}
  {% list.option name: "label", type: "Symbol" do %}
    The text to be displayed in the tab for the panel
  {% end %}
  {% list.option name: "partial", type: "String" do %}
    The path to the view template partial used to render the panel
  {% end %}
  {% list.option name: "hotkey", type: "String" do %}
    [keyboard shortcut](https://alpinejs.dev/directives/on#keyboard-events) to make panel become the active tab
  {% end %}
  {% list.option name: "disabled", type: "Boolean", default: false do %}
    Disabled tabs are still accessible but are greyed out in the UI
  {% end %}
  {% list.option name: "show", type: "Boolean", default: true do %}
    Whether or not to display the tab/panel
  {% end %}
  {% list.option name: "copy", type: "String" do %}
    If present, the panel will display a copy button that copies the value of this property to the clipboard when clicked
  {% end %}
  {% list.option name: "position", type: "Integer" do %}
    Position of the tab in the tab list
  {% end %}
  {% list.option name: "locals", type: "Hash" do %}
    A `Hash` of local variables that will be passed to the panel when it is rendered
  {% end %}
{% end %}

```ruby
Lookbook.define_panel(:info, {
  label: "New Panel",
  position: 1,
  partial: "path/to/view_partial",
  hotkey: "ctrl.n",
  disabled: false,
  show: true,
  copy: "Content to be copied",
  locals: {
    last_updated: '2022-03-02'
  }
})
```

All panel option values can be provided either as a **simple static value** or as a **lambda function**. Lambdas receive a single object with data relating to the currently active preview/example. For example:

```ruby
{
  label: "Params",
  disabled: ->(data) { data.preview.params.none? } # grey out the Params tab if no params are set for the current preview
}
```

The `data` hash provided as the single argument to any lambda functions contains the [same set of objects](#panel-templates) that are provided to the panel partial template ([see below](#panel-templates) for full details):

{%= options_list do |list| %}
  {% list.option name: "data.preview" do %}
    Object representing the current preview
  {% end %}
  {% list.option name: "data.examples" do %}
    Array of examples rendered in the current preview
  {% end %}
  {% list.option name: "data.context" do %}
    Data about the request context
  {% end %}
  {% list.option name: "data.app" do %}
    The main Lookbook `app` instance
  {% end %}
{% end %}

## Panel templates

Panel template files are just regular ERB partials. Unlike [pages](/guide/pages/) they are **not** additionally parsed as markdown.

Each panel is has access to a number of variables and helpers that can be used to build dynamic content.

### Variables

Any `locals` defined in the [panel options](#panel-options) will be available, plus the following:

{{ render "objects_list", objects: site.data.panel_variables }}

## Styling panel content

If you wish to specify custom CSS rules to style the contents of the panel, just include a `<style>` element in the panel partial template:

```erb
<style>
  h3 {
    color: green;
  }
</style>

<div>
  <h3>My Custom Panel</h3> <!-- will be green -->
  <!-- ... -->
</div>
```

{%= note :info do %}
The `<style>` element will be removed when the panel is rendered and any styles will be automagically **scoped to the panel that they are defined in**, so they will not affect other panels or leak out to affect the styling of the UI in general.
{% end %}

## Editing system panels

It is possible to edit, reorder or remove any of the system-provided panels, if required. The following panels are provided by Lookbook:

{%= options_list do |list| %}
  {% list.option name: ":preview" do %}
    Renders the preview in a resizable container
  {% end %}
  {% list.option name: ":output" do %}
    The rendered preview HTML source code
  {% end %}
  {% list.option name: ":source" do %}
    The preview example method source code (or preview template source, if using)
  {% end %}
  {% list.option name: ":notes" do %}
    [Preview notes](/guide/previews/annotating/#notes) panel
  {% end %}
  {% list.option name: ":params" do %}
    Inputs and controls for dynamic [preview parameters](/guide/previews/params/)
  {% end %}
{% end %}

### Removing a panel

To remove a panel from the UI entirely you can use the `Lookbook.remove_panel` method.

```ruby
Lookbook.remove_panel(<name>)
```

{%= options_list do |list| %}
  {% list.option name: "<name>", type: "Symbol" do %}
    The name of the panel to remove (see above for a list of [valid panel names](#editing-system-panels))
  {% end %}
{% end %}


```ruby
Lookbook.remove_panel(:notes) # Notes panel will not appear in the UI
```

### Editing panel properties

If you want to tweak any properties of a system-defined panel, you can do so using the `Lookbook.amend_panel` method.

```ruby
Lookbook.amend_panel(<name>, <opts>)
```

{%= options_list do |list| %}
  {% list.option name: "<name>", type: "Symbol" do %}
    The name of the panel to edit (see above for a list of [valid panel names](#editing-system-panels))
  {% end %}
    {% list.option name: "<opts>", type: "Hash" do %}
    A `Hash` of panel options to override ([see above](#panel-options) for full option details)
  {% end %}
{% end %}

```ruby
Lookbook.amend_panel(:params, {
  label: "Knobs", # change the tab text
  hotkey: "ctrl.k", # override hotkey
  position: 1 # move to first position in the tab list
})
```


{{toc}}


<!--

#### `components` (⚠️ experimental!)

An array of objects representing the components that are rendered in the preview. The components are 'guessed' from the Preview class name but if that doesn't work then they can be manually specified via annotations.

Each component object has the following properties:

* `component.name`
* `component.full_path`
* `component.dir_path`
* `component.template_path`
* `component.inline?`

To manually specify one or more components in the preview class, you can use the `@component` tag at the class level:

```ruby
# @component Elements::BigDangerButton 
class ButtonComponentPreview < ViewComponent::Preview

  def default
    render Elements::BigDangerButton.new do
      "Click here"
    end
  end

end
```

 -->