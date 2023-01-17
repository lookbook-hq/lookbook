---
id: pages
label: Overview
title: Overview
---

<%= render section(overview: true) do |s| %>
  <% s.with_block_prose do %>
    If you need to add more long-form documentation to live alongside your component previews you can do so using Lookbook's markdown-powered `pages` system.
  <% end %>

  <% s.with_block_note :tip do %>
    For an example of some pages in Lookbook, check out the [example pages](<%= links.v2.demo %>) in the Lookbook demo app and the associated [page files](<%= links.v2.demo_repo %>/tree/main/test/components/docs) in the demo repo.
  <% end %>
<% end %>

<%= render section("Adding pages", id: "adding") do |s| %>
  <% s.with_block_prose do %>
    Pages should be placed in the `test/components/docs` directory (although this [can be customised](/api/config#pages)) and can be nested in directories as deeply as required.

    ```
    test/components/docs/
      ├── overview.md.erb
      ├── best_practices.md.erb
      └── branding/
          ├── logos.md.erb
          └── themes.md.erb
    ```

    Pages must have either a `.html.erb` or a `.md.erb` file extension. All pages are rendered as ERB templates but `.md.erb` files will also additionally be run through a markdown parser.

    Pages can optionally make use of a [YAML frontmatter block](<%= guide_url :pages_frontmatter %>) to customise the behaviour and content of the page itself.

    An example page file might look like this:

    ```markdown
    ---
    title: An example page
    label: Nice example
    ---

    This is an example page. If it has a `.md.erb` file extension its
    contents will be run through a Markdown parser/renderer before display.

    Fenced code blocks are fully supported and will be highlighted appropriately.

    ERB can be used in here.
    The template will be rendered **before** being parsed as Markdown.

    You can can access data about the page using the `@page` variable.
    The title of this page is "<%%= @page.title %>".
    ```

    Because pages are rendered as ERB templates, it's possible to do things like [dynamically link to other pages](<%= guide_url :pages_variables %>#page-path), [embed previews](<%= guide_url :pages_embedding %>) directly in the page, [and more](<%= guide_url :pages_variables %>).
  <% end %>
<% end %>

<%= render section("Ordering pages and directories", id: "ordering") do |s| %>
  <% s.with_block_prose do %>
    If you want to enforce a specific order for pages and directories in the Lookbook navigation you can prefix the file/directory basename with an 'order number' integer value followed by an underscore or hyphen.

    For example: `01_example_page.md.erb` will be displayed first in the navigation (`01`) within the directory it is in.

    The integer value will be parsed out from the filename so that it doesn't appear in navigation labels or URLs, and the value itself will be used as a 'position' number when sorting the navigation items.

    For example, an ordered directory of pages might look like:

    ```
    test/components/docs/
      ├── 01_overview.md.erb
      ├── 02_implementation_notes/
      │   ├── 01_slots.md.erb
      │   └── 02_html_attributes.md.erb
      └── 03_helpful_examples/
          ├── 01_basic_components.md.erb
          └── 02_complex_components.md.erb
    ```

    Without the number prefixes on the file names the pages may not have appeared in the navigation in the desired order.
  <% end %>
<% end %>
