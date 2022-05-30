<div align="center">
<h1>👀 Lookbook 👀</h1>

<p>A component development and documentation tool for <a href="http://viewcomponent.org/">ViewComponent</a>-based projects.</p>

<div>
<a href="https://rubygems.org/gems/lookbook"><img src="https://badge.fury.io/rb/lookbook.svg" alt="Gem version"></a>
<a href="https://github.com/testdouble/standard"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="Ruby Style Guide"></a>
<a href="https://github.com/prettier/prettier"><img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg" alt="Code style: Prettier"></a>
</div>
</div>

---

<div align="center">
<a href="#installing">Installing</a> • <a href="#previews">Previews</a>  • <a href="#pages">Pages</a> •  <a href="docs/configuration.md">Configuration</a> 
</div>

<div align="center">
<a href="docs/deployment.md">Deployment</a> • <a href="docs/tips.md">Tips</a> • <a href="docs/contributing.md">Contributing</a> • <a href="#license">License</a>
</div>

---

## Overview

**Lookbook** gives [ViewComponent](http://viewcomponent.org/) projects a powerful **development UI** for exploring, inspecting and testing components in isolation, plus a markdown-based **documentation engine** to help create and share integrated, long-form component docs. 

Lookbook extends the native [ViewComponent preview functionality](https://viewcomponent.org/guide/previews.html) using [RDoc/Yard-style](docs/previews.md#annotations) comment tags/annotations. That means you don't need to learn a new DSL or create any extra files to get up and running, and you can easily drop Lookbook into (or take it out of!) your project at any time without rewriting your code.

![Lookbook UI](.github/assets/lookbook_screenshot.png)

## Lookbook Demo App 

If you want to have a quick play with Lookbook, the easiest way is to [give the demo app](https://github.com/allmarkedup/lookbook-demo) a spin. It's a basic Rails/ViewComponent app with a few test components included to tinker with.

**Online demo: https://lookbook-demo-app.herokuapp.com/lookbook**

If you'd rather dig in a bit more and run the demo app locally, the [demo repo](https://github.com/allmarkedup/lookbook-demo) contains instructions on how to get it up and running.

---

<h2 id="installing">Installing Lookbook</h2>

### 1. Add as a dependency

Add Lookbook to your `Gemfile` somewhere **after** the ViewComponent gem. For example:

```ruby
gem 'view_component', require: 'view_component/engine'
gem 'lookbook'
```

### 2. Mount the Lookbook engine

You then need to mount the Lookbook engine (at a path of your choosing) in your `routes.rb` file:

```ruby
Rails.application.routes.draw do
  mount Lookbook::Engine, at: '/lookbook' if Rails.env.development?
end
```

The `at` property determines the root URL that the Lookbook UI will be served at.

Then you can start your app as normal and navigate to `http://localhost:3000/lookbook` (or whatever mount path you specified) to view your component previews in the Lookbook UI.

<h2 id="previews">🔍 Component Previews</h2>

You don't need to do anything special to see your ViewComponent previews and examples in Lookbook - just create them as normal and they'll automatically appear in the Lookbook UI. Preview templates, custom layouts and even bespoke [preview controllers](https://viewcomponent.org/guide/previews.html#configuring-preview-controller) should all work as you would expect.

> If you are new to ViewComponent development, checkout the ViewComponent [documentation](https://viewcomponent.org/guide/) on how to get started developing your components and [creating previews](https://viewcomponent.org/guide/previews.html).


To enhance the core ViewComponent preview functionality, Lookbook supports the annotation of preview classes with RDoc/Yard-style tag comments.

An example annotated preview file might look something like this:

```ruby
# @label Basic Button
# @display bg_color "#fff"
class ButtonComponentPreview < ViewComponent::Preview

  # Primary button
  # ---------------
  # This is the button style you should use for most things.
  #
  # @label Primary
  def default
    render ButtonComponent.new do
      "Click me"
    end
  end

  # Button with icon
  # ----------------
  # This example uses dynamic preview parameters
  # which can be edited live in the Lookbook UI
  #
  # @param text
  # @param icon select [heart, cog, alert]
  def icon(text: "Spread the love", icon: "heart")
    render ButtonComponent.new(icon: icon) do
      text
    end
  end
end
```

Annotations can be used to generate 'live' parameter fields in dynamic component previews, to customise component labels in the navigation, to hide WIP components from the UI and much more.

[Read more about previews &rarr;](docs/previews.md)

<h2 id="pages">📖 Documentation Pages</h1>

Lookbook comes with an easy-to-use, Markdown-powered 'pages' engine for writing longer-form documentation.

'Live' component preview examples can be embedded in documentation pages to ensure no code duplications occurs and your documenation always stays up-to-date.

Documentation pages are files with either a `.html.erb` or a `.md.erb` file extension, which live within the `test/components/docs` directory. YAML Frontmatter is supported.

An example page might look like this:

```markdown
---
title: An example page
label: Nice example
---

This is an example page. If it has a `.md.erb` file extension its
contents will be run through a Markdown parser/renderer before display. ERB can be used in here too!

You can can access data about the page using the `@page` variable.
The title of this page is "<%= @page.title %>".

You can embed component previews in pages like this:

<%= embed Elements:ButtonComponentPreview, :default %>
```



[Read more about creating documentation &rarr;](docs/pages.md)

---

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
