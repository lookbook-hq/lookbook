---
id: components-partials
label: Using with Partials
title: Using with Template Partials
---

<%= render section(overview: true) do |s| %>
  
  <% s.with_block_prose do %>
    ActionView's **template partials** are a straighforward way to split larger view templates up into more modular, reusable chunks.

    Most Rails apps (even those that also use a framework such as ViewComponent) will have at least a few partials in their codebase,
    and a set of well considered partials can even serve as a basic sort of component library for smaller apps with simpler requirements.

    Lookbook enables partials to be previewed in isolation, either instead of or alongside any other components in the app.
  <% end %>

  <% s.with_block_note :tip do %>
    See the Rails docs for more details on using partials: [https://guides.rubyonrails.org/layouts_and_rendering.html](https://guides.rubyonrails.org/layouts_and_rendering.html#using-partials)
  <% end %>
<% end %>

<%= render section("Rendering in previews", id: "location") do |s| %>

  <% s.with_block_prose do %>
    Partials are rendered in [preview classes](<%= guide_url :previews %>#preview-classes) using the `render` method.

    ```rb
    # test/components/previews/article_preview.rb
    class ArticlePreview < Lookbook::Preview
      def default
        render "elements/article"
      end

      def with_args
        render "elements/article", title: "This is the title" do
          "This is the body"
        end
      end
    end
    ```

    The partial path should be relative to the `views` directory root.
  <% end %>

  <% s.with_block_subheading "Rendering templates", id: "templates" %>

  <% s.with_block_prose do %>

    It's also possible to render **entire view templates** instead of partials. To do so, use the following argument format when calling
    the `render` method:

    ```rb
    # test/components/previews/page_preview.rb
    class PagePreview < Lookbook::Preview
      def default
        render template: "pages/show"
      end

      def with_locals
        render template: "pages/show", locals: { title: "The Title" }
      end
    end
    ```

    As with partials, the template path should be relative to the `views` directory root.
  <% end %>
<% end %>