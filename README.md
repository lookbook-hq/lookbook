# Lookbook v1.0 [beta]

This is the **beta development** branch for Lookbook v1.0.

> See the [main branch](https://github.com/allmarkedup/lookbook/tree/main) for code and documentation for the current stable release.

## 🚀 Release focus

The main goals of the v1.0 release are:

- [x] Rebuild app UI using ViewComponent components
- [x] Improve usability of the small screen/mobile layout
- [x] Add support for some limited UI color theme customisation
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

### Main areas/points for testing:

- Existing Lookbook setups should continue to work **with no changes required**
- There have been a number of small UI changes - do any of them negatively affect your experience of using Lookbook?
- The Pages feature should work without opting in to any experimental features. 
- It's now possible to pick from one of a small set of pre-defined UI themes (finer-grained customisation coming soon!). [See below](#ui-theming) for details. Any thoughts on this?

> However absolutely any thoughts, comments or bug reports (even if unrelated to the specific areas above) would be much appreciated!

## New features

There are a number of new features that are planned for inclusion in the v1.0 release. They are:

### UI theming

Lookbook now ships with a small set of pre-defined UI themes, which can be set using the `ui_theme` config option:

```ruby
# config/application.rb (or similar)
config.lookbook.ui_theme = "blue"
```

Currently available themes are:

- `indigo` (default)
- `blue`
- `zinc`

> More themes and finer-grained customisation of theme colours is coming soon!

### Inspector panels customisation

It is now possible to add, remove or customise tabbed panels in the preview inspector by editing the `lookbook.inspector_panels` configuration option.

By default Lookbook comes with **five** panels split between two resizable panes:

1. The `main` pane - by default includes the `preview` and `output` (HTML) panels
2. The `drawer` pane - by default includes the  `source`, `notes` and `params` panels

These can be hidden, moved, reordered and/or added to as your project requires.

#### Panel config overview

Panels are defined as a hash with the following properties (all of which are actually optional):

```ruby
{
  label: "New Panel",
  pane: :drawer,
  position: 1,
  partial: "path/to/view_partial",
  content: "Some **markdown** content", 
  hotkey: "ctrl.n",
  disabled: false,
  show: true,
  copy: "Content to be copied",
}
```

* `label`: the text to be displayed in the tab
* `pane`: the panel location, either `:drawer` or `:main` (`:drawer` is the default)
* `position`: used for ordering the tabs
* `partial`: the path to the view template partial used to render the panel
* `content`: the default partial renders and displays the contents of this (markdown supported)
* `hotkey`: [keyboard shortcut](https://alpinejs.dev/directives/on#keyboard-events) to make panel become the active tab
* `disabled`: `true` or `false` - disabled tabs are still accessible but are greyed out in the UI
* `show`: `true` or `false` - whether or not to display the tab/panel
* `copy`: if present, the panel will display a copy button that copies the value of this property to the clipboard when clicked
* `locals`: a `Hash` of local variables that will be made available to the partial when rendering the panel

All panel config values can be provided either as a **simple static value** or as a **lambda function** which will receive a hash of data relating to the current preview/example. For example:

```ruby
{
  label: "Params",
  disabled: ->(data) { data.preview.params.none? } # grey out the Params tab if no params are set for the current preview
}
```

> **Work in progress!** There is more documentation to come on the data hash passed to lambdas.

#### Removing panels

To remove a pane entirely from the UI, just set it's value to false in your `application.rb` (or wherever you do your configuration):

```ruby
config.lookbook.inspector_panels.notes = false # remove the notes panel
```

#### Customising existing panels

Existing panel configuration can be amended as needed. For example, to change the label on one of the default panels:

```ruby
config.lookbook.inspector_panels.notes.label = "Instructions"

# or use block-style config
config.lookbook.inspector_panels do |panels|
  panels.notes.label = "Instructions"
end
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
