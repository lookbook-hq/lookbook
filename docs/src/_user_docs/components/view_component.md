---
id: components-view-component
label: Using with ViewComponent
title: Using with ViewComponent
---

<%= render section(overview: true) do |s| %>

  <% s.with_block_prose do %>
    **ViewComponent** is "a framework for creating reusable, testable & encapsulated view components, built to integrate seamlessly with Ruby on Rails".

    Lookbook was originally created to work with ViewComponent and is completely compatible with its preview system.
    
    Any [ViewComponent previews](https://viewcomponent.org/guide/previews.html) you create should **automatically be available in Lookbook with no additional steps required.**
  <% end %>

  <% s.with_block_note :tip do %>
    See the ViewComponent docs for setup and usage instructions: [https://viewcomponent.org/](https://viewcomponent.org/)
  <% end %>
  
<% end %>

<%= render section("Configuration", id: "config") do %>

  Lookbook will reference ViewComponent's configuration options where needed so you don't need to duplicate settings.
  Only Lookbook-specific [configuration options](<%= guide_url :config_reference %>) will be need to set directly.
  
  The following ViewComponent settings will be respected by Lookbook:

  * [`default_preview_layout`](https://viewcomponent.org/api.html#default_preview_layout--string)
  * [`preview_controller`](https://viewcomponent.org/api.html#preview_controller--string)
  * [`preview_paths`](https://viewcomponent.org/api.html#preview_paths--array)
  * [`view_component_path`](https://viewcomponent.org/api.html#default_preview_layout--string)

<% end %>

<%= render section("Preview classes", id: "previews") do %>

  [ViewComponent preview classes](https://viewcomponent.org/guide/previews.html#previews) extend `ViewComponent::Preview`:

  ```rb
  # test/components/previews/example_component_preview.rb
  class ExampleComponentPreview < ViewComponent::Preview
    def with_default_title
      render(ExampleComponent.new(title: "Example component default"))
    end
  end
  ```
  
  However, [Lookbook preview classes](<%= guide_url :previews %>#preview-classes) extend `Lookbook::Preview` instead.

  But don't worry! **You don't need to change or update your ViewComponent preview classes** to use them in Lookbook. The two are compatible with each other.

  You should continue to use `ViewComponent::Preview` for all ViewComponent previews and only use `Lookbook::Preview` for any additional [view partial](<%= guide_url :components_partials %>) or [Phlex](<%= guide_url :components_phlex %>) previews that you might have.
<% end %>