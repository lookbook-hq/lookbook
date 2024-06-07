# Lookbook v3 alpha

## Development status

Lookbook v3 is currently in an early-alpha stage and is under active, exploratory development.

The 'todo' list below is intended to provide a _very rough_ overview of the current state of progress. **It is not exhaustive**. Checked off items are likely to still be revisited/refactored/removed in the future without warning.

**Emoji key:**

* 🆕 - New feature in v3
* 🚧 - In progress or implemented but incomplete 
* 🧪 - Experimental feature/implementation

### UI

#### General

* [x] Basic desktop UI implementation
* [x] Replace Tailwind with vanilla CSS
* [x] Bespoke component system to replace ViewComponent
* [x] Status bar 🆕 🚧
* [x] Notifications for parser errors
* [x] SSE-based live UI updating 🧪 
* [x] Expand nav to current item when opening app
* [x] Don't fetch/render entire DOM on navigation (no need to re-render sidebar etc)
* [ ] Improve accessibilty (exact requirements tbd)
* [ ] Mobile/small screen layout optimisations
* [ ] Side-dockable preview inspector drawer
* [ ] Search fields 'clear' buttons
* [ ] Use custom icon sprite instead of inlined icons

#### Code samples

* [x] Syntax highlighting 🆕 🚧 🧪
* [ ] Replace Shiki with something lighter (server-side?)
* [ ] Click to copy
* [ ] Line wrap toggle

#### Theming/branding

* [x] Light/dark mode themes + toggle 🆕 🚧
* [x] Project links in header 🆕
* [ ] Theme system based on CSS custom properties 🚧
* [ ] Project logo customisation

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
* [x] `@location/@logical_path`
* [ ] `@component/@renders`
* [ ] `@source`
* [ ] `@after_render`
* [ ] `@status/@wip` ?

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
* [ ] Embed code dropdown
* [ ] Preview URL copy button
* [ ] Manual preview refresh button

#### Other

* [x] Grouped scenarios
* [x] Preview overview pages 🚧 🆕
* [x] Custom preview controllers support
* [x] Custom preview layouts support
* [x] Preview parser error reporting
* [x] Render previews in parent app context to fix path helper issues
* [x] JSON endpoint
* [x] ActionView annotation stripping
* [x] Config files for directories, nav order and label customisation
* [ ] Output transformation

### Preview Embeds

* [x] `<lookbook-embed>` implemented as HTML custom element
* [x] Internal embeds (within pages in Lookbook)
* [ ] External embeds (outside of Lookbook)
* [ ] Configurable frame ancestors

### Pages

* [x] Basic markdown + ERB pages system
* [x] YAML Frontmatter config
* [x] Landing page
* [x] Config files for directories, nav order and label customisation
* [ ] Tabbed pages
* [ ] Page layout and styling options 🚧

### Extending

* [x] Custom inspector panels 🚧
* [ ] Custom param inputs
* [ ] Custom tags
* [ ] Lifecycle hooks
* [ ] Global data store
* [ ] Ruby API

### Development

* [x] Replace Parcel with PostCSS + esbuild for compiling assets
* [x] Runnable, bundled demo app for development
* [x] Minitest test suite setup
* [x] Setup GH actions CI
* [x] Release script
* [ ] Comprehensive set of test components + previews 🚧
* [ ] UI integration tests 🚧
* [ ] Set up Ruby & Rails versions test matrix via Appraisal

### Internals

* [x] Auto-mounting of Lookbook engine 🆕
* [x] Remove ActionCable dependency, use SSE for triggering UI live updates 🆕 🧪
* [x] File change detection system
* [x] Config options defined in Ruby and not YAML
* [x] Config options synced with ViewComponent where appropriate
* [x] UUID-based permalink endpoint 🆕 🧪
* [x] Improved logger implementation
* [ ] Rationalise & document entity method names
* [ ] Make debug logging more consitent
* [ ] Improve parsing/tree building performance

### Documentation

* [x] Switch to Nanoc for static docs building?
* [ ] Document new features in v3 
* [ ] Port and update existing docs to new docs site
* [ ] Automate config option documentation via YARD
* [ ] Automate API docs via YARD
* [ ] Set up automated build & deploy process for docs

### Other/Ideas/Maybe

* [ ] CLI tool
* [ ] JSON API