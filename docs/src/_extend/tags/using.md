---
id: tags-using
label: Using Tag Data 
title: Using Tag Data
---

<%= render section(overview: true) do |s| %>
  Custom tags are most useful when combined with a custom preview inspector panel to display the data.
<% end %>

<%= render section("In custom panels", id: "custom-panels") do |s| %>
  <% s.with_block_subheading "Class tags", id: "class-level" %>
  <% s.with_block_prose do %>
    Tags added to the preview at the _class_ level are available via the `#tags` method on the [`preview` object](<%= api_module_url "PreviewEntity" %>):

    ```rb
    # @design figma https://share.figma.com/my-org/button-component
    class ButtonComponentPreview < Lookbook::Preview
      # ...
    end
    ```

    ```erb
    <%% preview.tags(:design).each do |tag| %>
      <!-- `tag` object is a CustomTag instance -->
    <%% end %>
    ```
  <% end %>

  <% s.with_block_subheading "Scenario tags", id: "method-level" %>
  <% s.with_block_prose do %>
    Tags added to individual _scenarios_ (methods) are available via the `#tags` method on the [`target`](<%= api_module_url "RenderedScenarioEntity" %>):

    ```rb
    class ButtonComponentPreview < Lookbook::Preview
      # @design sketch https://share.sketch.com/my-org/fancy-button-variant
      def fancy_button
        render ButtonComponent.new(fancy: true) do
          "Click me"
        end
      end
    end
    ```

    ```erb
    <%% target.tags(:design).each do |tag| %>
      <!-- `tag` object is a CustomTag instance -->
    <%% end %>
    ```
  <% end %>
  
<% end %>
