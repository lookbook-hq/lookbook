---
title: Getting Started
layout: default
---

It's quick and easy to get up and running with Lookbook.
Follow this guide to get up and running quickly and then explore the rest of the docs to dive in deeper!

## 1. Install Lookbook

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

{%= note do %}
The value of the `at` property in the `mount Lookbook::Engine, at:` statement determines the root URL that the Lookbook UI will be served at.
{% end %}

## 2. Check Lookbook is running

Start your app as normal and navigate to `http://localhost:3000/lookbook` (or whatever mount path you specified). You should see the Lookbook UI.

If this is a **new project** (with no components or previews) you will just see the Lookbook welcome screen at this point. Don't worry! We'll add a component with a preview in the next step.

If this is an **existing project** with some components and preview classes already defined then you should see them listed in the navigation on the left. Click on one to open it in the inspector.

## 3. Add a component (with a preview)

For the purposes of this guide we'll use the [ViewComponent generator](https://viewcomponent.org/guide/generators.html#generate-a-preview) to create an example component with a corresponding preview file:

```bash
bin/rails generate component Example title --preview
```

This will generate an `ExampleComponent` class and corresponding template in `app/components`, and a `ExampleComponentPreview` [preview class](https://viewcomponent.org/guide/previews.html#previews) in `test/components/previews`.


