# Lookbook

**Supercharge your [ViewComponent](http://viewcomponent.org/) development.**

🚧 Lookbook is in the **very early stages of development** and is not in any way stable yet! 🚧

## About

Lookbook provides a _ready-to-go_ UI to browse, inspect and preview your ViewComponent components. It uses (and extends) ViewComponent's in-built [component preview functionality](https://viewcomponent.org/guide/previews.html) so should integrate seamlessly with any existing components.

## Installing

Lookbook is current a work in progress and **has not been published as a Gem** yet.

If you wish to play with it in it's current state you can include it directly from Github using the instructions below.

In your `Gemfile` add:

```ruby
gem "lookbook", git: "https://github.com/allmarkedup/lookbook", branch: "main
```

This line should be placed <strong>below</strong> where you have specified the `view_component` gem.

## Installation

To use the component browser, you need to mount it (at a path of your choosing) in your `routes.rb` file:

```ruby
Rails.application.routes.draw do
  # any other routes...
  mount Lookbook::Engine, at: "/lookbook"
end
```

The `at` property determines the root URL that the Lookbook UI will be served at.

Then start your app as normal and navigate to `/lookbook` (or whatever mount path you specified) to view your component previews in the Lookbook UI.

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
