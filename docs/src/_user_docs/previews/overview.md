---
id: previews
label: Overview
title: Overview
---

<%= render section(overview: true) do |s| %>
  <% s.with_block_prose do %>
    **Preview classes** are used to provide a set of illustrative examples ([_scenarios_](#scenarios)) for how each component should be used.

    Preview classes typically have a 1-to-1 mapping with components, with each component having its own dedicated preview class.
  <% end %>

  <% s.with_block_note :info do %>
    Lookbook's preview system is based upon (and is fully compatible with) ViewComponent's [native preview system](https://viewcomponent.org/guide/previews.html),
    so any existing ViewComponent previews should automagically show up in the Lookbook UI. Read more about [using Lookbook with ViewComponent &rarr;](<%= guide_url :components_view_component %>)
  <% end %>
<% end %>

<%= render section("Preview classes", id: "preview-classes") do |s| %>

  <% s.with_block_subheading "Location and naming", id: "location" %>

  <% s.with_block_prose do %>
    Preview classes live in the `test/components/previews` directory by default.

    File names must end in `_preview.rb` and should reflect the name of the component they are rendering - for example `button_component_preview.rb`.
  <% end %>

  <% s.with_block_note :tip do %>
    The preview directory path can be changed via the `preview_paths` [config option &rarr;](<%= guide_url :config_reference %>#preview_paths)
  <% end %>

  <% s.with_block_prose do %>
    Preview classes extend `Lookbook::Preview` (or optionally `ViewComponent::Preview` if [using with ViewComponent](<%= guide_url :components_view_component %>)).

    ```rb
    # test/components/previews/button_component_preview.rb
    class ButtonComponentPreview < Lookbook::Preview
      # scenarios defined here
    end
    ```
  <% end %>

  <% s.with_block_subheading "Scenarios", id: "scenarios" %>

  <% s.with_block_prose do %>

    Each **public method** defined within a preview class represents **a unique scenario** in which the target component is rendered using a particular set of arguments.

    Lookbook will generate an isolated component preview for each scenario and make it accessible via the preview navigation.

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

  <% s.with_block_subheading "Passing parameters", id: "parameters" %>
  
  <% s.with_block_prose do %>
    You can set dynamic values from URL parameters by setting them as arguments:

    ```rb
    # test/components/previews/example_component_preview.rb
    class ExampleComponentPreview < Lookbook::Preview
      def with_dynamic_title(title: "Example component default")
        render(ExampleComponent.new(title: title))
      end
    end
    ```

    And then supply values via URL parameters:
    
    ```
    /lookbook/inspect/example/with_dynamic_title?title=Custom+title
    ```
    
    For better ease of use and discoverability you can optionally add preview param tags
    to **generate form fields** so that parameter values can be **set on-the-fly from within the Lookbook UI**.
    
    Read more about [dynamic preview params &rarr;](<%= guide_url :previews_params %>)
  <% end %>

  <% s.with_block_subheading "Preview layouts", id: "layouts" %>

  <% s.with_block_prose do %>

    Previews render with the application layout by default, but can be configured to use a specific layout either globally or on a per-preview-class basis.

    [See the preview layout docs for details on configuring and using layouts &rarr;](<%= guide_url :previews_layouts %>)
  <% end %>

  <% s.with_block_subheading "Preview templates", id: "templates" %>

  <% s.with_block_prose do %>

    Given a preview `test/components/previews/cell_component_preview.rb`, template files for each scenario can be defined within the `test/components/previews/cell_component_preview/` directory:

    ```rb
    # test/components/previews/cell_component_preview.rb
    class CellComponentPreview < Lookbook::Preview
      def default
      end
    end
    ```

    ```erb
    <!-- test/components/previews/cell_component_preview/default.html.erb -->
    <table class="table">
      <tbody>
        <tr>
          <%%= render CellComponent.new %>
        </tr>
      </tbody>
    </div>
    ```

    To use a different location for preview templates, pass the `template` argument (the path should be relative to the preview directory):

    ```rb
    # test/components/previews/cell_component_preview.rb
    class CellComponentPreview < Lookbook::Preview
      def default
        render_with_template(template: 'custom_cell_component_preview/my_preview_template')
      end
    end
    ```

    [Values from params](#parameters) can be accessed through locals:

    ```rb
    # test/components/previews/cell_component_preview.rb
    class CellComponentPreview < Lookbook::Preview
      def default(title: "Default title", subtitle: "A subtitle")
        render_with_template(locals: {
          title: title,
          subtitle: subtitle
        })
      end
    end
    ```
  <% end %>

  <% s.with_block_subheading "Configuring the preview controller", id: "controller" %>

  <% s.with_block_prose do %>  
    Extend previews to add authentication, authorization, before actions, etc. using the `lookbook.preview_controller` [config option](<%= guide_url :config_reference %>#preview_controller):

    ```rb
    config.lookbook.preview_controller = "MyPreviewController"
    ```
  <% end %>

  <% s.with_block_note :tip do %>
    Note that if you are using ViewComponent, this option should be set via the `view_component.preview_controller` config option instead, as per the ViewComponent docs:

    ```rb
    config.view_component.preview_controller = "MyPreviewController"
    ```

    Lookbook will respect this value when rendering its previews.
  <% end %>

<% end %>

<%= render section("Organizing previews", id: "organizing") do |s| %>
  <% s.with_block_prose do %>    
    The contents of the preview directory can be organised into folders and Lookbook will reflect this structure in its navigation tree.

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
<% end %>

<% if false %>
  


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

<% end %>