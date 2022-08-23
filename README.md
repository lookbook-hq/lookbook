# Lookbook v1.0 [beta]

**This is the development branch for Lookbook v1.0.**

_For code and documentation for the current stable release see the [main branch](https://github.com/allmarkedup/lookbook/tree/main)._

---

📣 **This v1.0 beta is still under active development.** However no breaking changes are envisaged to the current implementation and it should now be stable enough to be used for day-to-day development. Give it a try! 🎉

---
 
## 📚 Documentation

The new (work-in-progress) **documentation site** for Lookbook v1.0 is available here:

👉 **https://lookbook-docs-v1-beta.netlify.app/** 👈

> Documentation source files are located in the `/docs` directory within this repository. The docs are built using [Bridgetown](https://www.bridgetownrb.com/).

## 🚀 Demo app

There is a demo of the latest v1.0 beta here:

👉 **https://lookbook-demo-app-v1-0-beta.herokuapp.com/lookbook/** 👈

[![Lookbook UI](.github/assets/lookbook_screenshot_v1.0_beta.png)](https://lookbook-demo-app-v1-0-beta.herokuapp.com/lookbook/)


## 🔎 Release focus

The main goals of the v1.0 release are:

- [x] Rebuild app UI using ViewComponent components
- [x] Improve usability of the small screen/mobile layout
- [x] Add support for basic UI color theme customisation
- [x] Allow users to extend Lookbook with custom panels and by hooking into lifecycle events
- [x] Remove the `experimental` flag from the [Pages](https://github.com/allmarkedup/lookbook#pages)
- [x] Improve the development/debugging setup
- [ ] Improve the test setup and test coverage, switch to RSpec **[in progress]**

**No breaking changes** are planned for user-facing features, although the app UI will include some minor visual updates and usability improvements.

## 👋 Testing and feedback - help wanted!

The bulk of the v1.0 'new feature' development work is now mostly complete, although testing and bug fixing is ongoing.

**If you are an existing Lookbook user** I'd greatly appreciate if you can kick the tyres on the v1.0 beta and open an issue with any bug reports, suggestions or feedback you might have, either about Lookbook itself or the [new docs site](https://lookbook-docs-v1-beta.netlify.app/).

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
