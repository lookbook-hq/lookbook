---
id: previews
label: Previews
title: Previews
---

<%= render section(overview: true) do |s| %>
  <% s.with_block_prose do %>
    Component preview classes are at the heart of Lookbook and provide a way to specify how to generate previews for the [components](<%= guide_url :components %>) in your project.

    Preview classes typically have a 1-to-1 mapping with components, with each component usually having its own dedicated preview class.
  <% end %>

  <% s.with_block_note :info do %>
    Lookbook's preview system is based upon (and is 100% compatible with) ViewComponent's [in-built preview system](https://viewcomponent.org/guide/previews.html),
    so any existing ViewComponent previews should just automagically show up in the Lookbook UI without any changes required.
  <% end %>
<% end %>

<%= render section("Preview class format", id: "format") do |s| %>
  <% s.with_block_prose do %>
    Component preview classes extend `Lookbook::Preview` (or optionally `ViewComponent::Preview` when creating ViewComponent previews).

    **Each public method** defined in the preview class **represents a unique scenario** in which the target component is rendered with a specific set of params.

    Lookbook will generate previews for all scenarios and link to them from the main navigation tree.

    ```rb
    # test/components/previews/button_component_preview.rb
    class ButtonComponentPreview < Lookbook::Preview
      def standard
        render ButtonComponent.new(text: "Click me")
      end

      def with_icon
        render ButtonComponent.new(text: "Launch spaceship", icon: "rocket")
      end

      private

      # Private methods are ignored and will not show up in the navigation
      def not_a_scenario
        # ...
      end
    end
    ```
  <% end %>
<% end %>

<%= render section("Naming conventions", id: "naming") do |s| %>

  <% s.with_block_prose do %>
    Preview class file names must end in `_preview.rb` and should reflect the name of the component they are rendering - for example `button_component_preview.rb`.
    
    Lookbook will ensure any file name suffixes are stripped out when generating labels for previews in the navigation.
  <% end %>
<% end %>

<%= render section("Location and organization", id: "organizing") do |s| %>
  <% s.with_block_prose do %>
    Preview classes live in the `test/components/previews` directory.
    
    The contents of this directory can be organised into folders and Lookbook will reflect this structure in its navigation tree.

    Watch out for **preview class namespacing in subdirectories** - the class namespace must reflect the relative path to the preview class (just like classes in the main Rails `app` directory). Note the file path and the (correct) namespacing in the example below:

    ```rb
    # test/components/previews/elements/buttons/primary_button_component_preview.rb
    class Elements::Buttons::PrimaryButtonComponentPreview < Lookbook::Preview
      def default
        render PrimaryButtonComponent.new(text: "Click me")
      end
    end
    ```
  <% end %>

  <% s.with_block_note :tip do %>
    The preview directory path can be changed via the `preview_paths` config option. [Learn more &rarr;](<%= guide_url :config_reference %>#preview_paths).
  <% end %>
<% end %>

<%= render section("Rendering components", id: "rendering-components") do |s| %>
  <% s.with_block_prose do %>
    Preview class methods can render components by calling the `render` method with the
    appropriate arguments for the type of component being rendered.
  <% end %> 

  <% s.with_block_subheading("ViewComponents", id: "view-components") %>

  <% s.with_block_prose do %>
    When rendering ViewComponents an instance of the target component class should be supplied to the `render` call.
    See the [ViewComponent preview docs](https://viewcomponent.org/guide/previews.html) for full details.

    ```rb
    # test/components/previews/heading_component_preview.rb
    class HeadingComponentPreview < ViewComponent::Preview
      def default
        render HeadingComponent.new(text: "This is a heading")
      end

      def with_block_content
        render HeadingComponent.new do
          tag.strong "This is a heading"
        end
      end
    end
    ```
  <% end %> 

  <% s.with_block_subheading("Phlex views", id: "phlex") %>

  <% s.with_block_prose do %>
    As with ViewComponents, Phlex views can be rendered by passing an instance of the required view class to the `render` call.

    ```rb
    # test/components/previews/card_view_preview.rb
    class CardViewPreview < Lookbook::Preview
      def default
        render CardView.new(title: "Welcome!")
      end

      def with_block_content
        render CardView.new do
          tag.em "Wecome via block content"
        end
      end
    end
    ```
  <% end %>

  <% s.with_block_subheading("Partials", id: "partials") %>

  <% s.with_block_prose do %>
    Template partials are identified by their path (relative to the views directory and stripped of the underscore prefix on the file name)
    in [the same way](https://guides.rubyonrails.org/layouts_and_rendering.html#using-partials) as they are when being rendered in a view template.

    ```rb
    # test/components/previews/button_partial_preview.rb
    class ButtonPartialPreview < Lookbook::Preview
      def default
        # Will attempt to render the file `app/views/elements/_button.html.erb`
        render "elements/button"
      end

      def with_local_vars
        # Local variables can be supplied as keyword arguments:
        render "elements/button", text: "Click me", icon: true
      end

      def with_block_content
        # Any block content supplied can be yielded in the partial
        render "elements/button" do
          tag.em "Click me please"
        end
      end
    end
    ```
  <% end %>
<% end %>

<%= render section("Customising with annotations", id: "annotations") do |s| %>

  <% s.with_block_prose do %>
    Previews can be customized by adding [Yard](https://yardoc.org/)-style [comment annotations](<%= guide_url :previews_annotations %>) to the preview class source code.

    Annotations are are a powerful and unobtrusive way to customise the way previews are
    rendered on an individual basis, as well as to provide extra information for use elsewhere.

    See the section on [using annotations](<%= guide_url :previews_annotations %>) for more information.
  <% end %>
<% end %>