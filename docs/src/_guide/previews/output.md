---
id: previews-output
label: Output Transformation
title: Preview Output Transformation 
---

<%= render section(overview: true) do |s| %>
  <% s.with_block_prose do %>
    It is possible to add a transformation step to the preview rendering process to allow for post-processing of
    the HTML output before it is displayed in the inspector.

    The transformed HTML will be used in the preview and displayed in the HTML output tab of the preview inspector.
  <% end %>
<% end %>

<%= render section("Specifying a transformer", id: "transformer") do |s| %>
  <% s.with_block_prose do %>
    Use the `@after_render` tag to specify a private transformer method, referenced via its symbolized name.

    ```rb
    # @after_render :transformer_method_name
    ```

    ```ruby
    class FooComponentPreview < ViewComponent::Preview
      # @after_render :wrangle_html
      def default
        render FooComponent.new
      end

      private

      def wrangle_html(html, context)
        MyApp::Services::HTMLWrangler.call(html)
      end
    end
    ```
  <% end %>

  <% s.with_block_note :tip do %>
    The `@after_render` tag can be applied at the **scenario** or **preview class** level.
    When set at the class level all scenarios within the class will be run through the specified transformer method.
  <% end %>
<% end %>

<%= render section("The transformer method", id: "method") do |s| %>
  <% s.with_block_prose do %>
    The transformer method is called with two arguments:
    
    * `html`: The rendered `HTML` (as a string)
    * `context`: Object of render context data

    The method should return a **string of transformed HTML** to be displayed in the preview inspector.
  <% end %>
<% end %>