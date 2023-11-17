---
id: concepts
label: Concepts & Terminology
title: Concepts & Terminology
---

<%= render section(overview: true) do |s| %>
  <% s.with_block_prose do %>
    Before diving into these developer docs (especially if you start finding yourself interacting with 
    the [Lookbook API](<%= api_url :lookbook %>)) it may be useful to get an overview of some of the internal
    concepts and terminology used in the system, and see how it all fits together.
  <% end %>
<% end %>

<%= render section("Components", id: "components") do |s| %>
  <% s.with_block_prose do %>    
    Components are the UI building blocks within your project. Lookbook supports
    previewing a number of different component types including [ViewComponents](https://viewcomponent.org), [Phlex](https://www.phlex.fun/) views and ActionView partials.

    [Read more about components &rarr;](<%= guide_url :components %>)
  <% end %>

  <% s.with_block_note :tip do %>
    Components are represented by [RenderableEntity](<%= api_module_url "RenderableEntity" %>) objects in the Lookbook API.
  <% end %>

<% end %>

<%= render section("Previews", id: "previews") do |s| %>

  <% s.with_block_prose do %>
    Preview classes are where individual preview methods are defined.

    Each preview class should reference a single [component](#components)
    and provide one or more [scenarios](#scenarios) to show the results of rendering that component with different sets of params.

    [Read more about previews &rarr;](<%= guide_url :previews %>)
  <% end %>

  <% s.with_block_note :tip do %>
    Preview classes are represented by [PreviewEntity](<%= api_module_url "PreviewEntity" %>) objects in the Lookbook API.
  <% end %>
<% end %>

<%= render section("Scenarios", id: "scenarios") do |s| %>

  <% s.with_block_prose do %>
    Each method in a [Preview](#preview) class defines a new preview _scenario_.
    
    A scenario provides an example of the target component being rendered with a specific set of parameters.
    Scenarios are roughly analogous to the concept of ['storys'](https://storybook.js.org/docs/react/get-started/whats-a-story) in Storybook.

    [Read more about scenarios &rarr;](<%= guide_url :previews %>#scenarios)
  <% end %>

  <% s.with_block_note :tip do %>
    Scenarios are represented by [ScenarioEntity](<%= api_module_url "ScenarioEntity" %>) objects in the Lookbook API.
  <% end %>
<% end %>

<%= render section("Pages", id: "pages") do |s| %>

  <% s.with_block_prose do %>
    Pages are markdown files that can be used to create long-form documentation for your component library.

    [Read more about pages &rarr;](<%= guide_url :pages %>)
  <% end %>

  <% s.with_block_note :tip do %>
    Pages are represented by [PageEntity](<%= api_module_url "PageEntity" %>) objects in the Lookbook API.
  <% end %>
<% end %>




