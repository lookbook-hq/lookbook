<img src=".github/assets/lookbook_logo.svg" width="240">

<hr>

## Lookbook v3.0 development branch

Work-in-progress, exploratory rebuild of Lookbook for a future v3.0 release.

[Overview](#overview) ・ [Requirements](#requirements) ・ [Usage](#usage)  ・ [Development](#development) ・ [Key goals](#key-goals)  ・ [Current status](#current-status)


## Overview

The main aims of Lookbook v3 include:

* **UI**: Easier theming, better accessibilty, remove ViewComponent dependency
* **Previews**: ActionMailer previews, preview overview pages, improved error handling and feedback
* **Pages**: More styling and layout customisation options
* Remove ActionCable requirement for live UI updates (use SSE)
* Streamline the Lookbook development and testing process

> See the [key goals](#key-goals) section for more details on the additions, improvements and updates that are planned for this release.

## Requirements

* Ruby >= 3.0.0
* Rails >= 6.1.0

## Usage

### Installation

Lookbook v3 is currently under heavy development and **should not be considered stable**.

However, intrepid indiviuals who are familiar with Lookbook and wish to kick the tyres or get a preview of the upcoming changes can install the Lookbook gem directly from the `v3` branch of this repo:

```rb
group :development do
  gem "lookbook", github: "ViewComponent/lookbook", branch: "v3"
  gem "listen" # Optional but allows faster 'smart' updates when changes occur
end
```

Lookbook will automatically be mounted at `/lookbook` within your app when the server is started.

> **Note:** Previously Lookbook required manual mounting in your app. This is **no longer the case**, so if trialing v3 in a project with an existing Lookbook install you must remove [the mounting code](https://lookbook.build/guide/installation#step-2) from your routes.rb file first.

### Configuration

The currently implemented v3 configuration options are not yet documented, but can be seen in the [config.rb](lib/lookbook/config.rb) file.

> **Note:** If testing out the v3 branch on an existing Lookbook install you may see errors if setting v2.x config options that have not yet been re-implemented in v3.

### Breaking changes

Lookbook v3.0 will contain a number of breaking changes from the v2.x releases.

The majority of these changes will be in the _extending_, _theming_ and _API_ areas, so heavily customised Lookbook installations may find upgrading a more involved process. As yet there is no documentation on the exact scope of these changes.

In addition, until v3 development reaches beta release stage there are likely to be _unintentional breaking changes_ due to missing or partly-implemented features.

For these reasons, it is recommended that anyone who wants to kick the tyres on the pre-alpha v3 codebase do so **on new projects or existing projects with simple, 'vanilla' Lookbook installs** to minimise the chance of running into issues.

### Running in production

Please don't do this. It's really not ready yet.

## Development

### Demo app

Start the demo app in development mode:

```
bin/dev
```

Visit http://localhost:4444/lookbook

> In development mode assets will be rebuilt as changes are made.

### Testing

Integration tests run against the demo app.

Run the tests:

```
bin/test
```

### Logging and debugging

`Lookbook` logs its activity to `Lookbook.logger`.
This is the primary method of debugging.

#### Custom logger

You can call `Lookbook.logger =` to set a custom `Lookbook` logger for the process. For example:

```rb
Lookbook.logger = Rails.logger
```

#### Default logger

If no custom logger is set, a default `Lookbook` logger which logs to to `STDERR` will be created and assigned to `Lookbook.logger`.

The default logger defaults to the `error` logging level (severity).
You can override the logging level by setting the environment variable `LOOKBOOK_LOG_LEVEL=<level>`.
For `<level>`, all standard `::Logger` levels are supported, with any mix of upper-/lower-case:

```bash
export LOOKBOOK_LOG_LEVEL=debug
export LOOKBOOK_LOG_LEVEL=info
export LOOKBOOK_LOG_LEVEL=warn
export LOOKBOOK_LOG_LEVEL=fatal
export LOOKBOOK_LOG_LEVEL=error
```

The default of `error` will be used if an unsupported value is set.

#### Disabling logging

If you want to disable `Lookbook` logging, set

```rb
Lookbook.logger = ::Logger.new('/dev/null')
```

## Key goals

Below are some of the key goals for the Lookbook v3 release. This is a constantly evolving list!

### UI

* Improve accessibilty
* Remove ViewComponent as a dependency, use bespoke component system to build UI (to avoid VC version incompatabilities with parent app)
* Use vanilla CSS instead of Tailwind
* Light and dark modes out of the box
* Better theming system using CSS variables
* Make `<lookbook-embed></lookbook-embed>` a proper web component
* Add status bar for notifications and info

### Previews

* Add support for Mailer previews
* Per-preview overview/documentation pages 
* Improve previews of partials/view templates, ensure they are 100% compatible with how they are used in parent app
* Handle and display parser errors in the UI
* Configurable frame ancestors for preview embeds

### Pages

* More customisation and theming options
* Make linking to other pages and previews easier and more flexible

### Development/Testing

* Include runnable test/demo/development app in codebase
* Make ongoing Lookbook development easier - simpler asset dev/build process, automated releases
* Use Minitest instead of Rspec
* Run tests against demo app
* Ensure good integration test coverage
* Make logging play nicer with standard Rails logging options and third party gems

### Other

* Remove ActionCable requirement, use SSE for live UI updates in dev
* Improve error handling and compatability with `better_errors` etc
* Improve clarity and readability of codebase
* Drop support for older Ruby/Rails versions

## Current status

Lookbook v3 is currently in a pre-alpha stage and is under active, exploratory development.

The 'todo' list below is intended to provide a _very rough_ overview of the current state of progress. **It is not exhaustive**. Checked off items may still be revisited/refactored/removed in the future without warning.

**Emoji key:**

* 🆕 - New feature in v3
* 🚧 - In progress or implemented but incomplete 
* 🧪 - Experimental feature/implementation

### UI

* [x] Basic desktop UI implementation
* [x] Replace Tailwind with vanilla CSS
* [x] Bespoke component system to replace ViewComponent
* [x] Status bar 🆕 🚧
* [x] Notifications for parser errors
* [x] Light/dark mode themes + toggle 🚧
* [x] Client-side syntax highlighting via Shiki 🆕 🚧 🧪 
* [x] SSE-based live UI updating 🧪 
* [ ] Theme system based on CSS custom properties 🚧
* [ ] Improve accessibilty (exact requirements tbd)
* [ ] Mobile/small screen layout optimisations
* [ ] Side-dockable preview inspector drawer

### Previews

#### Preview types

* [x] ViewComponent previews
* [x] Phlex previews
* [x] Partials/templates previews
* [x] ActionMailer previews 🆕 🧪

#### Tags/annotations

* [x] Notes
* [x] `@label`
* [x] `@hidden`
* [x] `@param`
* [x] `@display`
* [x] `@!group ... @!endgroup`
* [x] `@id` 🆕
* [x] `@priority` 🆕
* [ ] `@logical_path`
* [ ] `@component`
* [ ] `@source`
* [ ] `@after_render`

#### Dynamic params

* [x] Text input
* [x] Textarea input
* [x] Select input
* [x] Checkbox input 🆕
* [ ] Toggle input
* [ ] Color picker input
* [ ] Range input

#### Display options

* [x] Static display options
* [x] Dynamic display options

#### Inspector

* [x] Preview panel
* [x] Output panel
* [x] Usage panel (combination of old 'source' and 'notes' panels)
* [x] Metadata panel 🚧 🆕 🧪
* [x] Params panel 🚧 
* [ ] Configurable breakpoints for quick preview viewport resizing

#### Other

* [x] Grouped scenarios
* [x] Preview overview pages 🚧 🆕
* [x] Custom preview controllers support
* [x] Custom preview layouts support
* [x] Preview parser error reporting
* [x] Render previews in parent app context to fix path helper issues
* [ ] JSON endpoint(s)
* [ ] Output transformation
* [ ] ActionView annotation stripping

### Preview Embeds

* [x] `<lookbook-embed>` implemented as HTML custom element
* [x] Internal embeds (within pages in Lookbook)
* [ ] External embeds (outside of Lookbook)
* [ ] Configurable frame ancestors

### Pages

* [x] Basic markdown + ERB pages system
* [x] YAML Frontmatter config
* [ ] Tabbed pages
* [ ] Page layout and styling options 🚧
* [ ] Landing page

### Extending

* [x] Custom inspector panels 🚧
* [ ] Custom param inputs
* [ ] Custom tags
* [ ] Lifecycle hooks
* [ ] Global data store
* [ ] Ruby API

### Development

* [x] Asset build/compilation system
* [x] Runnable, bundled demo app for development
* [x] Minitest test suite setup
* [ ] Comprehensive set of test components + previews 🚧
* [ ] Good level of test coverage 🚧

### Internals

* [x] Auto-mounting of Lookbook engine 🆕
* [x] UI live-refresh using SSE instead of websockets via ActionCable 🆕 🧪
* [x] UUID-based permalink endpoint 🆕
* [x] Config options defined in Ruby and not YAML
* [x] Config options synced with ViewComponent where appropriate
* [x] File change detection system
* [x] Improved logger implementation

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).