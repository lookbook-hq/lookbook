---
title: Getting Started
layout: default
---

It's quick and easy to get up and running with Lookbook.
Follow this guide to get up and running quickly and then explore the rest of the docs to dive in deeper.

{{ toc }}

## Install Lookbook

Add Lookbook to your `Gemfile` somewhere *after* the ViewComponent gem:

```ruby
gem "view_component"
gem "lookbook"
```

Then mount the Lookbook engine (at a path of your choosing) in your routes file:

```ruby
Rails.application.routes.draw do
  if Rails.env.development?
    mount Lookbook::Engine, at: "/lookbook"
  end
end
```

{%= note :info do %}
The value of the `at` property in the `mount Lookbook::Engine, at:` statement determines the root URL that the Lookbook UI will be served at.
{% end %}

## Add a component and preview

*You can skip this step if you are installing Lookbook into a project with existing components.*

For the purposes of this guide we'll use the [ViewComponent generator](https://viewcomponent.org/guide/generators.html#generate-a-preview) to create an example component with a corresponding preview file:

```bash
bin/rails generate component Example title --preview
```

This will generate an `ExampleComponent` class and corresponding template in `app/components`, and a `ExampleComponentPreview` [preview class](https://viewcomponent.org/guide/previews.html#previews) in `test/components/previews`.

## View the preview in Lookbook

Point your browser to `http://localhost:3000/lookbook` (or whatever mount path you specified) and click on the `Example` component link in the sidebar on the left.

You will see the component preview in the Lookbook UI.

<!-- screenshot here -->

## Dive deeper...

Now that you have a component preview to experiment with, dig into the [preview docs](/guide/previews) to learn more about creating additional examples, [adding annotations](/guide/annotations) and more.

