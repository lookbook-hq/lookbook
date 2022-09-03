# Lookbook

<div>
<a href="https://rubygems.org/gems/lookbook"><img src="https://img.shields.io/gem/v/lookbook" alt="Gem version"></a>
<a href="https://github.com/allmarkedup/lookbook/actions/workflows/ci.yml"><img src="https://github.com/allmarkedup/lookbook/actions/workflows/ci.yml/badge.svg?branch=main" alt="CI status"></a>
</div>
<br>

A tool to help browse, develop, test & document [ViewComponents](https://viewcomponent.org/) in your app.

## Documentation

**Lookbook (v1.x)** documentation: **[https://lookbook.build](https://lookbook.build)**

> _Looking for v0.9.x docs? [Head over here](https://github.com/allmarkedup/lookbook/tree/0.9.x)._


## Demo

**Online Demo:** [https://lookbook-demo-app.herokuapp.com/lookbook](https://lookbook-demo-app.herokuapp.com/lookbook) 

[![Lookbook UI](.github/assets/lookbook_screenshot_v1.0_beta.png)](https://lookbook-demo-app.herokuapp.com/lookbook/)


## Development

Lookbook's UI is itself built using ViewComponents. To preview these components in a Lookbook instance you can run the included `workbench` app:

1. Clone this repo
2. Install dependencies: `bundle install & npm install`
3. Start the app: `bin/workbench`
4. Visit http://localhost:4545/lookbook to view the Lookbook instance

The `workbench` app will be started in development mode and any changes to Lookbook's views or assets will immediately be reflected in the UI.

### Docs site

The [Lookbook docs site](https://lookbook.build) is built using [Bridgetown](https://www.bridgetownrb.com/) and the source files can be found in the `./docs` directory.

To see a local version of the site run `bin/docs` from the root of this repo and then visit http://localhost:4000 in your browser.

### Testing

Lookbook uses RSpec for testing.

Tests can be run using the `rake spec` or `bundle exec rspec` commands.

The dummy app that the tests are being run against can be viewed by running the `bin/dummy` command and then browsing to http://localhost:9292/lookbook


## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
