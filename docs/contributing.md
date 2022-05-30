## Contributing to Lookbook

Lookbook is very much a small hobby/side project at the moment, so any and all contributions to keep helping it move forward are always much appreciated :rocket:

Please ensure you read and agree to the [Contributor Covenant Code of Conduct](../CODE_OF_CONDUCT.md) before contributing. And of course feel free to open an issue if you need any help with anything or have spotted a bug somewhere - I try my best to reply to comments as quickly as I can.

### Lookbook Workshop

Since version 1.0, Lookbook's UI is itself built using ViewComponent components. That means that it's possible to use Lookbook to preview and develop the components that it's own UI is made up of :-)

To facilitate this, Lookbook includes a small 'Workshop' app that provides previews for all of Lookbook's own components. If you are thinking of making changes to the UI then developing using the Workshop app is highly recommended.

#### Running the Workshop app

1. **Clone the Lookbook repo: `git clone git@github.com:allmarkedup/lookbook.git`
2. **Install dependencies: `bundle install` from the root of the repo. 
3. **Start the Workshop app: `foreman start` - this will start a server and also watch the asset files for changes and recompile them as necessary.
4. Open the UI in your browser: http://localhost:4545 and start browsing Lookbook's components.

Any changes made to the Lookbook source code will then be reflected in the component previews and the UI of the Workshop itself.

### Using the demo app for local development

It is also possible to use the [lookbook-demo](https://github.com/allmarkedup/lookbook-demo) app for local development by linking it to a local version of the Lookbook gem, which can then be edited to make changes as required.

#### Initial setup:

1. Clone the Lookbook repo: `git clone git@github.com:allmarkedup/lookbook.git`
2. Also pull down the [lookbook-demo](https://github.com/allmarkedup/lookbook-demo) repository to your machine
3. In the `Gemfile` of the `lookbook-demo` repository, replace the line [`gem "lookbook" , ">= x.x.x"`](https://github.com/allmarkedup/lookbook-demo/blob/694b5a20a5155afeeda7d9f08f041b9a11699383/Gemfile#L29) with `gem "lookbook", path: "../path/to/lookbook"` (use the path to your local copy of lookbook)
4. Install dependencies: `bundle install` from the root of the demo repo.

#### Starting development

1. From within the `lookbook` root directory run the comand `npm run dev` (this will make sure the CSS/JS is recompiled if/when you make changes to the UI)
2. From within the `lookbook-demo` root directory run `npm run start` - this will start a server and build the demo assets

Point your browser to http://localhost:3000/lookbook to see the UI. You can then make and test changes to the Lookbook code in your local copy of lookbook repo. PRs are welcome if you add anything useful :-)

> Note that changes to files in the Lookbook `lib/` directory will require a server restart in order to have them applied.

### Tests

Lookbook uses Rspec for testing. Tests are run against a dummy app (`spec/dummy`) using [Combustion](https://github.com/pat/combustion).

#### Test Commands

Test commands should be run from within the `lookbook` root directory.

* Run all tests - `rake lookbook:test` 
* Serve the dummy test app - `rake lookbook:test:serve` (and then open http://localhost:9292/lookbook/ in your browser)