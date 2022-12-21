---
id: params-adding
label: Adding Custom Inputs
title: Adding Custom Inputs
---

<%= render section(id: "overview") do |s| %>
  <% s.with_title "Overview", hidden: true %>

  Lookbook ships with a number of pre-defined param input types that are used when adding [dynamic preview parameters](<%= guide_url :previews_params %>) to your previews.

  However if you need a param type that isn't provided by Lookbook (or want to override one of the existing ones) you can easily add your own and then reference them in your `@param` tags.
<% end %>

<%= render section("Adding a custom input", id: "adding") do |s| %>
  <% s.with_block_prose do %>
    To define a custom input you can do so using the `Lookbook.add_param` method when when you [configure your Lookbook installation](<%= guide_url :configuration %>):
  <% end %>

  <% s.with_block_api_method "Lookbook", :add_param, show: [:params] %>

  <% s.with_block_prose do %>
    For example, to create a customised url input with a `https://` prefix in front of it you could do the following:

    ```ruby
    # config/application.rb
    Lookbook.add_param(:prefixed_url, "inputs/prefixed_url")
    ```

    ```erb
    <!-- app/views/inputs/_prefixed_url.html.erb -->
    <div>
      <strong>https://</strong>
      <%%= text_field_tag(name, value,
        **input_options,
        type: "url",
        "x-model": "value"
      ) %>
    </div>
    ```

    This input field will then be rendered when using the `prefixed_url` input type in `@param` tags:

    ```ruby
    class IframeComponentPreview < ViewComponent::Preview
      # @param src prefixed_url
      def default(src: 'example.com')
        render IframeComponent.new(src: src)
      end
    end
    ```

    See the [input template docs](<%= extend_url :params_templates %>) for more details on available template variables and helpers.
  <% end %>
<% end %>