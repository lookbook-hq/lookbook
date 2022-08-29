# Lookbook v1.0

<div>
<a href="https://rubygems.org/gems/lookbook"><img src="https://img.shields.io/gem/v/lookbook?include_prereleases" alt="Gem version"></a>
<img src="https://github.com/allmarkedup/lookbook/actions/workflows/ci.yml/badge.svg?branch=v1.0-beta" alt="CI status">
</div>
<br>

> **This is the Lookbook v1.0 BETA development branch.**<br>
>_For code and documentation for the current stable release see the [main branch](https://github.com/allmarkedup/lookbook/tree/main)._


## Get started

If you are already using Lookbook in your project, just update the Lookbook gem to the latest beta release and then head over to the [beta documentation site](https://beta.lookbook.build/) to read more about the new features.

```ruby
gem "lookbook", ">= 1.0.0.beta.8"
```

If you are **new to Lookbook** then check out the <a href="https://beta.lookbook.build/guide/quick-start/">v1.0 quick start guide</a> for more detailed instructions on installing Lookbook in your project


<h4>Useful Resources</h4>

* 👉 <a href="https://beta.lookbook.build/">v1.0 docs</a>
* 👉 <a href="https://lookbook-demo-app-v1-0-beta.herokuapp.com/lookbook">v1.0 demo app</a> <em>(The repo for the demo <a href="https://github.com/allmarkedup/lookbook-demo/tree/v1.0-beta">is here</a> if you want to dig in further)</em>



## Changes and new features in v1.0

Lookbook v1.0 includes a completely re-written UI, many under-the hood improvements and a some exciting new customisation options.

### Frontend changes:

* Completely re-written UI - now built with ViewComponents
* New [UI themes and customisation options](https://beta.lookbook.build/guide/themes/)
* Improved small-screen/mobile view
* Debug menu
* ...and many other small visual and usability improvements

### New options for extending Lookbook:

* Define [custom tags](https://beta.lookbook.build/guide/extend/tags/) for preview file annotations
* Create [your own tab panels](https://beta.lookbook.build/guide/extend/panels/) - with complete control over content/layout and access to all Lookbook data
* Use [lifecycle hooks](https://beta.lookbook.build/guide/extend/hooks/) to run your own code when Lookbook starts up, when files change or at shutdown

### Other changes

* 'Workbench' app for developing Lookbook's UI components in Lookbook
* New Rspec-based test suite and dummy app
* All new documentation site built using [Bridgetown](https://www.bridgetownrb.com/)


[![Lookbook UI](.github/assets/lookbook_screenshot_v1.0_beta.png)](https://lookbook-demo-app-v1-0-beta.herokuapp.com/lookbook/)

## Workbench

As of this release, Lookbook's UI is itself built using ViewComponent components. To help with development it is possible to preview these components (in a Lookbook instance!) by running the included 'Workbench" app, as follows:

1. Clone this repo
2. Install dependencies: `bundle install & npm install`
3. Start the Workbench: `foreman start`
4. Open http://localhost:4545 in your browser to view the Workbench

This will start the Workbench app in development mode and any changes to Lookbooks views or assets will immediately be visible in the UI.


## Running tests

The test suite is in the process of being completely overhauled.

Tests are now written using RSpec and the system now uses [Combustion](https://github.com/pat/combustion) under the hood.

- Tests can be run using the `rake lookbook:test` or `bundle exec rspec` commands.
- The dummy app that the tests are being run against can be viewed by running the `rake lookbook:test:serve` command and then browsing to http://localhost:9292/lookbook


---

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
