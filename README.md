<br>
<img src=".github/assets/lookbook_logo.svg" width="180"> 

Lookbook is a **UI development environment** for Ruby on Rails applications.

[![Gem version](https://img.shields.io/gem/v/lookbook)](https://rubygems.org/gems/lookbook)
[![CI status](https://github.com/ViewComponent/lookbook/actions/workflows/ci.yml/badge.svg?branch=v2)](https://github.com/ViewComponent/lookbook/actions/workflows/ci.yml)
<br>

---

**🚨 This is the v2.0 development branch! 🚨**

For the current stable release see the [main branch](https://github.com/ViewComponent/lookbook/tree/main).

---

## Resources

* 🚧 **Docs**: [v2.lookbook.build](https://v2.lookbook.build)
* 🚧 **Demo**: [v2-demo.lookbook.build/](http://v2-demo.lookbook.build/) ([repo here](https://github.com/ViewComponent/lookbook-demo/tree/v2))

<br>

[![Lookbook UI](.github/assets/lookbook_ui.png)](http://v2-demo.lookbook.build/)


## Development

Lookbook is implemented as an isolated [Rails Engine](https://guides.rubyonrails.org/engines.html) and uses [ViewComponent](https://viewcomponent.org), [Tailwind](https://tailwindcss.com/) and [Alpine](https://alpinejs.dev/) for its UI.

This repository contains:

* The Lookbook source code ([`/app`](https://github.com/ViewComponent/lookbook/tree/main/app), [`/lib`](https://github.com/ViewComponent/lookbook/tree/main/lib), [`/config`](https://github.com/ViewComponent/lookbook/tree/main/config), etc)
* The Lookbook [documentation site](#docs-site) source code and content ([`/docs`](https://github.com/ViewComponent/lookbook/tree/main/docs)).
* A [test suite](#testing) with a 'runable' dummy app ([`/spec`](https://github.com/ViewComponent/lookbook/tree/main/spec)).

### Documentation site

The [Lookbook docs site](https://lookbook.build) is built using [Bridgetown](https://www.bridgetownrb.com/) and the source files can be found in the `./docs` directory.

To preview changes locally you can run a development version of the docs site:

1. Clone this repo
2. Install dependencies: `bundle install`
3. Start the app: `bin/docs`
4. Visit http://localhost:4000 

### Testing

Lookbook uses [RSpec](https://relishapp.com/rspec) for testing.

Tests can be run using the `rake spec` or `bundle exec rspec` commands.

The dummy app that the tests are being run against can be viewed by running the `bin/dummy` command and then browsing to http://localhost:9292/lookbook


## Contributing

Lookbook is an un-funded open source project and contributions of all types and sizes are most welcome!

Please take the time to read over the [Contributing](./CONTRIBUTING.md) guide before making your first contribution and if anything isn't clear then [start a discussion](https://github.com/ViewComponent/lookbook/discussions) and we will do our best to help you out.

## Contributors 

Lookbook was created by [Mark Perkins](https://github.com/allmarkedup) and continues to grow
&amp; improve thanks to the ideas, suggestions and hard work of all of [these excellent humans](https://github.com/ViewComponent/lookbook/graphs/contributors):
<br>
<br>
<a href="https://github.com/ViewComponent/lookbook/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=ViewComponent/lookbook&columns=14" width="800" />
</a>

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).