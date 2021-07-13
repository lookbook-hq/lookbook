<div align="center"> 
<h2> 👀 Lookbook 👀</h2>
 
⚡️ Supercharge your [ViewComponent](http://viewcomponent.org/) development process 🚀

</div>

---

## About

Lookbook provides a _ready-to-go_ UI for navigating, inspecting and interacting with ViewComponent previews. It uses (and extends) ViewComponent's in-built [component preview functionality](https://viewcomponent.org/guide/previews.html) and is intended to integrate seamlessly with existing ViewComponent libraries.

The goal is to (eventually) give a [Storybook](https://storybook.js.org/)-like development experience for ViewComponents, but hopefully with a more 'Railsy' feel and without having to learn a whole new DSL.

> ⚠️ **PLEASE NOTE!** ⚠️
> Lookbook is very much a **work in progress** at the moment. It's nowhere near a v1.0 release. Expect lots of breaking 💥 changes at any time... as well as things that are just plain broken.

![Lookbook UI](.github/assets/lookbook_screenshot.png)

### Lookbook demo

If you want to have a quick play with Lookbook, the easiest way is to [give the demo app](https://github.com/allmarkedup/lookbook-demo) a spin. It's a basic Rails/ViewComponent app with a few test components included to tinker with.

The [demo app repo](https://github.com/allmarkedup/lookbook-demo) contains instructions on how to get it up and running.

### Current features

- 🚸 Navigate your component previews with ease!
- 🔍 Filter/search previews by name
- 🖥 Resizable, responsive preview window
- 🤓 Highlighted preview source code
- 🏳️‍🌈 Highlighted HTML output
- 📝 Add notes via comments in the preview file - supports markdown too!
- 🚀 UI auto-updates when files are edited

### Future plans and ideas (in no particular order)...

- In-browser editing of [dynamic preview param](https://viewcomponent.org/guide/previews.html#previews) values
- Support a wider range of possible ViewComponent project setups and styles
- A nice way to document and display component parameter schema
- Idenfication and linking to previews of any sub-components of the preview component
- Quick toggling between a set of project-specific preview window sizes in the UI
- Helpers for setting background colour and other preview window properties on a per-preview basis
- More configuration options for customising UI look and feel
- Ability to override nav tree generation
- Better filtering/search, including keyboard navigation
- Tagging of previews/examples for grouping and advanced search
- Preview/component metadata tab in inspector
- Start/end of note delimiters within example comment parsing
- Preview/component-level notes in addition to the example-level ones
- Make UI work better on small screens
- UI accessibility improvements
- Some tests would be nice 🤔

## Installing

Lookbook is current a work in progress and **has not been published as a Gem** yet.

If you wish to play with it in it's current state you can include it directly from Github using the instructions below.

### 1. Add as a dependency

In your `Gemfile` add:

```ruby
gem "lookbook", git: "https://github.com/allmarkedup/lookbook", branch: "main"
```

This line should be placed <strong>below</strong> wherever you have specified the `view_component` gem.

### 2. Mount the Lookbook engine

You then need to mount the Lookbook engine (at a path of your choosing) in your `routes.rb` file:

```ruby
Rails.application.routes.draw do
  # any other routes...
  mount Lookbook::Engine, at: "/lookbook"
end
```

The `at` property determines the root URL that the Lookbook UI will be served at.

Then start your app as normal and navigate to `http://localhost:3000/lookbook` (or whatever mount path you specified) to view your component previews in the Lookbook UI.

## Usage

You don't need to do anything special to create ViewComponent previews for Lookbook.

Lookbook will use the [ViewComponent configuration options](https://viewcomponent.org/api.html#configuration) for your project to find and render your components so you don't need to configure anything separately (unless you want to tweak the behaviour or look of Lookbook itself).

> If you are new to ViewComponent development, checkout the [ViewComponent docs](https://viewcomponent.org/guide/) on how to get started developing your components.

Lookbook uses the exact same [preview files](https://viewcomponent.org/guide/previews.html) as 'regular' ViewComponent previews, so using preview templates, custom layouts and even bespoke [preview controllers](https://viewcomponent.org/guide/previews.html#configuring-preview-controller) should all work just the same.

Lookbook does however bring a few additions to the standard ViewComponent previews. That's why it exists!

### 📝 Preview notes

Lookbook lets you add notes to your preview examples which are then displayed in the inspector panel. They look something like this:

<img src=".github/assets/preview_example_notes.png" style="max-width: 500px;">

Notes are generated from comments above example methods in your preview files. Below is an example of two preview examples that both have notes:

```ruby
# test/components/previews/button_component_preview.rb
class ButtonComponentPreview < ViewComponent::Preview

  # Add notes as comments above the example methods.
  # Multi-line is just fine and **markdown** is supported too!
  #
  # It's a good place to put usage and implementation instructions
  # for people browsing the component previews in the UI.
  def default
    render ButtonComponent.new(text: "Click me")
  end

  # Each preview example has it's own notes, extracted from the method comments.
  def danger
    render ButtonComponent.new(text: "Don't do it!", theme: :danger)
  end
end
```

## Configuration

> There is not much to configure in Lookbook yet, but more UI customisation options are planned for the future.

Lookbook uses ViewComponent's configuration options for anything to do with previews, paths and general setup, so you won't need to duplicate any settings.

However the following Lookbook-specific config options are also available:

### UI auto-refresh

Disable/enable the auto-updating of the Lookbook UI when files change. Enabled by default.

```ruby
config.lookbook.auto_refresh = false # default is true
```

## Contributing

Lookbook is very much a small hobby/side project at the moment. I'd love to hear from anyone who is interested in contributing but I'm terrible at replying to emails or messages, so don't be surprised if I take forever to get back to you. It's not personal 😜

However, I'm a frontend developer - not a Rails dev - so any thoughts, advice or PRs on how to improve the codebase will be always much appreciated! 🍻

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
