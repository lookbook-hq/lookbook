---
id: pages-variables
title: Variables & Helpers
---

<%= render section(overview: true) do |s| %>
  Pages are rendered as an ERB templates before being (optionally) processed as markdown, and
  Lookbook makes a number of variables and helpers available that can be used to add dynamic content.
<% end %>

<%= render section("Variables", id: "variables") do |s| %>
  <% s.with_block_prose do %>
    All pages have the following variables available for use in the page template:  
  <% end %>

  <% s.with_block_options_list options: [
    {
      name: "page",
      types: "PageEntity",
      text: "Object representing the current page"
    },
    {
      name: "next_page",
      types: "PageEntity",
      text: "Object representing the next page (if available)"
    },
    {
      name: "previous_page",
      types: "PageEntity",
      text: "Object representing the previous page (if available)"
    },
    {
      name: "pages",
      types: "Array<PageEntity>",
      text: "Array of all available pages"
    },
  ] %>

  <% s.with_block_prose do %>

    [Page objects](<%= api_url :page_entity %>) have access to the frontmatter variables for that page:

    ```erb
    The page title is <%%= page.title %>
    Our brand color hex value is <%%= page.data[:brand_colors][:red] %>
    ```

  <% end %>
<% end %>

<%= render section("Helpers", id: "helpers") do |s| %>
  <% s.with_block_prose do %>
    The following helpers are available to use in your page templates. 
  <% end %>

  <% s.with_block_api_module_methods(:page_helper) %>

<% end %>

