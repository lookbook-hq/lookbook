---
id: components-phlex
label: Using with Phlex
title: Using with Phlex
---

<%= render section(overview: true) do |s| %>

  <% s.with_block_prose do %>
    
    **Phlex** is "a framework for building fast, reusable, testable views in pure Ruby".

    Whilst Phlex does not have a concept of a 'component' as such but its [views](https://www.phlex.fun/html/introduction/) can effectively be used to
    fulfill the same role in an application.

    Lookbook enables you to preview Phlex views in isolation for development and testing. 

  <% end %>

  <% s.with_block_note :link do %>
    See the Phlex docs for setup and usage instructions: [https://phlex.fun](https://www.phlex.fun)
  <% end %>
<% end %>

<%= render section("Locating views", id: "location") do %>

  Lookbook assumes that Phlex view files will be stored in the `app/views` directory.

  If that is not the case, you will need to add your Phlex view path to the `component_paths` [config option](<%= guide_url :config_reference %>#component_paths):

  ```rb
  config.lookbook.component_paths << "path/to/phlex/views"
  ```

<% end %>

<%= render section("Rendering in previews", id: "location") do %>

  Phlex components are rendered in [preview classes](<%= guide_url :previews %>#preview-classes) using the `render` method:

  ```rb
  # test/components/previews/article_view_preview.rb
  class ArticleViewPreview < Lookbook::Preview
    def default
      render Views::Article.new
    end

    def with_args
      render Views::Article.new(title: "This is a title") do
        "This is the body"
      end
    end
  end
  ```
<% end %>