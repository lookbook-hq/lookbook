---
id: previews-nav
label: Customising the Nav
title: Customising the Nav
---

<%= render section(overview: true) do |s| %>
  Lookbook automatically generates a hierarchical navigation tree for previews based on the folder structure of your preview directory.

  The navigation labels for previews and scenarios are generated based on the preview class name and method names respectively, but this can be customised on a per-preview basis.
<% end %>

<%= render section("Custom labels", id: "label") do |s| %>
  <% s.with_block_prose do %>

    Use the `@label` annotation tag if you want to customise the navigation label for a preview or scenario.

    ```rb
    @label <text>
    ```

    The `@label` tag can be used on both preview classes and scenario methods:

    ```rb
    # @label A custom preview label
    class FooComponentPreview < Lookbook::Preview
      # @label A custom example Label
      def default
        # ...
      end
    end
    ```
  <% end %>
<% end %>

<%= render section("Navigation paths", id: "logical_path") do |s| %>
  <% s.with_block_prose do %>
    Use the `@logical_path` tag to change the location that the preview will appear in within the nav tree.

    ```rb
    @logical_path <directory_path>
    ```

    The `@logical_path` value should be the path to the nav directory that you wish to display the preview within.
  <% end %>

  <% s.with_block_note :tip do %>
    Note that the provided path is just a virtual construct - it does not have to really exist anywhere in your app. 
  <% end %>

  <% s.with_block_prose do %>

    ```rb
    # @logical_path elements/base
    class FooComponentPreview < Lookbook::Preview
      # ...
    end
    ```

    In the example above, the `FooComponentPreview` would exist in the navigation at `Elements > Base > Foo` rather than at the top level of the nav tree.

    The `@logical_path` tag can only be used at the preview class level, not on individual scenarios (methods).
  <% end %>
<% end %>

<%= render section("Hiding previews", id: "hidden") do |s| %>
  <% s.with_block_prose do %>
    By default, all preview classes and scenarios are shown in the preview navigation.

    The `@hidden` annotation tag lets you hide entire previews or individual examples from the navigation.
  <% end %>

  <% s.with_block_note :tip do %>
    Hidden previews are still accessible at their URL so this can be useful when developing components that are not yet ready to share with the wider team.
  <% end %>

  <% s.with_block_subheading "Hide an entire preview", id: "hide-all" %>

  <% s.with_block_prose do %>
    ```rb
    # @hidden
    class FooComponentPreview < Lookbook::Preview
      def example_1
        # ...
      end
    end
    ```
  <% end %>

  <% s.with_block_subheading "Hide a specific scenario", id: "hide-scenario" %>

  <% s.with_block_prose do %>
    ```rb
    class FooComponentPreview < Lookbook::Preview
      def ready_to_go
        # ...
      end

      # @hidden
      def work_in_progress
        # ...
      end
    end
    ```
  <% end %>
<% end %>


<%= render section("Sorting preview examples", id: "sorting") do |s| %>
  <% s.with_block_prose do %>
    By default, preview examples in the navigation are ordered in the same order that their corresponding methods appear within the preview class.

    If you prefer to have your preview examples sorted alphabetically, you can use the `sort_examples` global [configuration option](<%= guide_url :config_reference %>):

    ```rb
    # config/application.rb
    config.lookbook.sort_examples = true
    ```
  <% end %>
<% end %>