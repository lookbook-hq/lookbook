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
<div class="lookbook-panel">
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

{{ render "options_list", options: site.data.panels[:options] }}

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
    [Preview object](/api/entities/preview/) representing the current preview
  {% end %}
  {% list.option name: "data.examples" do %}
    Array of [examples](/api/entities/example/) that are included in the current preview
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

To match the padding and styles of the system panels you should ensure your panel's content is in an element with the `.lookbook-panel` class applied to it.

```html
<div class="lookbook-panel">
  <!-- your panel content here -->
</div>
```

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

## Adding JavaScript

Lookbook uses [Alpine JS](https://alpinejs.dev/) for its UI, and it is available for use in panel templates too. It's a great way to add interactivity without ever having to touch a script tag.

For example, to add a button to show/hide a piece of content in the panel, it's as simple as this:

```erb
<div x-data="{ open: false }">
  <button @click="open = !open">Show/hide content</button>
  <div x-show="open">
    Some content here
  </div>
</div>
```

Check out the [Alpine JS documentation](https://alpinejs.dev/) for more information.

{%= note :info do %}
Because of the way that new content is loaded in to the UI when navigation occurs, adding arbitrary JavaScript in a `script` tag within
the panel template may not always work as expected, so it is recommended to use Alpine for adding interactivity where required.
{% end %}

### Utility classes

There are a number of utility classes available for use in panels to make it easier to match the look and feel of the rest of the Lookbook UI.

{%= options_list do |list| %}
  {% list.option name: ".lookbook-panel" do %}
    Apply to the panel's root element
  {% end %}
  {% list.option name: ".prose" do %}
    Apply to text content containers. Adds default prose styles to child elements.
  {% end %}
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