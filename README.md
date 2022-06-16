# Lookbook v1.0 [beta]

This is the **beta development** branch for Lookbook v1.0.

> See the [main branch](https://github.com/allmarkedup/lookbook/tree/main) for code and documentation for the current stable release.

## 🚀 Release focus

The main goals of the v1.0 release are:

- [x] Rebuild app UI using ViewComponent components
- [x] Improve usability of the small screen/mobile layout
- [x] Add support for some limited UI color theme customisation
- [x] Add support for custom inspector panels
- [x] Remove the `experimental` flag from the [Pages](https://github.com/allmarkedup/lookbook#pages)
- [x] Improve the development/debugging setup, and allow previewing Lookbook's own components in Lookbook :-)
- [ ] Improve the test setup and test coverage, switch to RSpec **[in progress]**

**No breaking changes** are planned for user-facing features, although the app UI will include some minor visual updates and usability improvements.

## Demo app

There is a demo of the current v1.0-beta here: https://lookbook-demo-app-v1-0-beta.herokuapp.com/lookbook/

[![Lookbook UI](.github/assets/lookbook_screenshot_v1.0_beta.png)](https://lookbook-demo-app-v1-0-beta.herokuapp.com/lookbook/)

## 👋 Testing and feedback - help wanted!

The bulk of the v1.0 'new feature' development work is now mostly complete, although testing and bug fixing is ongoing.

**If you are an existing Lookbook user** I'd greatly appreciate if you can kick the tyres on the v1.0 beta and open an issue with any bug reports, suggestions or feedback you might have.

### Main areas/points for testing/feedback:

- Existing Lookbook setups should continue to work **with no changes required**
- It's now possible to pick from one of a small set of pre-defined **UI themes** (plus finer-grained customisation coming soon). [See below](#ui-theming) for details.
- You can now [extend Lookbook](#extending-lookbook) to more closely customise it to your needs - testing and feedback around this area would be a great help!

> Any thoughts, comments or bug reports (even if unrelated to the specific areas above) would be much appreciated!


## UI theming

Lookbook v1.0 ships with a small set of pre-defined UI themes, which can be set using the `ui_theme` config option:

```ruby
# config/application.rb
config.lookbook.ui_theme = "blue"
```

Currently available themes are:

- `indigo` (default)
- `blue`
- `zinc`

> More themes and finer-grained customisation of theme colours is coming soon!

## Extending Lookbook

> Opening up Lookbook to more in-depth customisation is a work in progress and any feedback or use-case examples would be greatly appreciated!

* [Lifecycle Hooks](#lifecycle-hooks)
* [Adding inspector panels](#adding-inspector-panels)
* [Removing inspector panels](#removing-inspector-panels)

### Lifecycle hooks

A number of lifecycle hooks are available for use in triggering actions outside of Lookbook.

All hook callback blocks are yielded a `Lookbook` instance as the first argument. Some hooks additionally supply other arguments, see below for details.

#### `:after_initialize`

This is run once Lookbook has been set up and the initial parsing of files has been completed.

```ruby
Lookbook.after_initialize do |app|
  puts "Lookbook version #{app.version} has started"
  puts "There are #{app.previews.size} previews and #{app.pages.size} pages"
  # other code here...
end
```

#### `:after_change`

Run each time a change is detected to a file that Lookbook is watching, unless listening for changes has been disabled in the config.

Receives a hash as the second argument with `:modified`, `:added`, and `:removed` properties, each of which is an array of affected file paths.

```ruby
Lookbook.after_change do |app, changes|
  puts "Modified files: #{changes.modified.join("\n")}"
  puts "Added files: #{changes.added.join("\n")}"
  puts "Removed files: #{changes.removed.join("\n")}"
end
```

#### `:before_exit`

Run when the current process exits, after Lookbook has stopped any listeners.

```ruby
Lookbook.after_initialize do |app|
  puts "Shutting down..."
end
```

### Adding inspector panels

It's now possible to add custom inspector panels/tabs to Lookbook using the `:define_panel` method:

```ruby
Lookbook.define_panel(<name>, <opts>)
```

* `<name>`: A unique name for the panel
* `<opts>`: A `Hash` of options (see below for details)

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

#### Panel templates

The panel partial template will have access to any `locals` defined in the [panel options](#panel-options), plus the following variables:

#### `panel`

The resolved panel options object (see below for details)

```erb
<h2><%= panel.label =></h2>
```

#### `preview`

An object representing the current preview:

* `preview.id`
* `preview.label`
* `preview.full_path`
* `preview.url_path`
* ... 

#### `examples`

An array of objects representing the individual examples being rendered in the current preview. (For non-grouped previews, this array will always only have one item.)

Each example has the following properties:

* `example.output` - the rendered preview example output (String)
* `example.source` - the example source code (String)
* `example.source_lang` - a hash of information about the source language (Ruby or HTML/ERB, depending on whether the example uses a preview template)
* `example.id`
* `example.label`
* `example.full_path`
* `example.url_path`
* ... 


#### `components`

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

#### `context`

An object containing data about the request context:

* `context.preview_params`
* `context.path`

#### `app`

The main `Lookbook` app instance.

* `app.previews` - Array of preview objects
* `app.pages` - Array of page objects
* `app.logger` - Logger instance

#### Panel options

```ruby
{
  label: "New Panel",
  position: 1,
  partial: "path/to/view_partial",
  content: "Some **markdown** content", 
  hotkey: "ctrl.n",
  disabled: false,
  show: true,
  copy: "Content to be copied",
  locals: {}
}
```

* `label`: the text to be displayed in the tab
* `position`: used for ordering the tabs
* `partial`: the path to the view template partial used to render the panel
* `content`: the default partial renders and displays the contents of this (markdown supported)
* `hotkey`: [keyboard shortcut](https://alpinejs.dev/directives/on#keyboard-events) to make panel become the active tab
* `disabled`: `true` or `false` - disabled tabs are still accessible but are greyed out in the UI
* `show`: `true` or `false` - whether or not to display the tab/panel
* `copy`: if present, the panel will display a copy button that copies the value of this property to the clipboard when clicked
* `locals`: a `Hash` of local variables that will be made available to the partial when rendering the panel


All panel option values can be provided either as a **simple static value** or as a **lambda function** which will receive a hash of data relating to the currently active preview/example. For example:

```ruby
{
  label: "Params",
  disabled: ->(data) { data.preview.params.none? } # grey out the Params tab if no params are set for the current preview
}
```

The `data` hash contains the same set of objects that are passed to the panel partial template:

* `data.preview`
* `data.examples`
* `data.components`
* `data.context`
* `data.app`

**See the [panel templates section above]((#panel-templates)) for more details.**

### Removing inspector panels

To remove a panel entirely from the UI you can use the `Lookbook.remove_panel` method:

```ruby
# config/application.rb
Lookbook.remove_panel(:notes)
```

## 🛠 Workbench

As of this release, Lookbook's UI is itself built using ViewComponent components. To help with development it is possible to preview these components (in a Lookbook instance!) by running the included 'Workbench" app, as follows:

1. Clone this repo
2. Install dependencies: `bundle install & npm install`
3. Start the Workbench: `foreman start`
4. Open http://localhost:4545 in your browser to view the Workbench

This will start the Workbench app in development mode and any changes to Lookbooks views or assets will immediately be visible in the UI.


## 🚦 Running tests

The test suite is in the process of being completely overhauled.

Tests are now written using RSpec and the system now uses [Combustion](https://github.com/pat/combustion) under the hood.

- Tests can be run using the `rake lookbook:test` or `bundle exec rspec` commands.
- The dummy app that the tests are being run against can be viewed by running the `rake lookbook:test:serve` command and then browsing to http://localhost:9292/lookbook


---

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
