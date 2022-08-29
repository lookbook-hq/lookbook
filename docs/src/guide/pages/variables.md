---
layout: default
title: Variables and Helpers
---

Pages are rendered as an ERB templates before being (optionally) processed as markdown, and
Lookbook makes a number of variables and helpers available that can be used to add dynamic content.


## Variables
 
All pages have the following variables available for use in the page template:

{%= options_list do |list| %}
  {% list.option name: "page" do %}
    The current [page object](/api/entities/page/)
  {% end %}
  {% list.option name: "next_page" do %}
    The next [page object](/api/entities/page/) (if available)
  {% end %}
  {% list.option name: "previous_page" do %}
    The previous [page object](/api/entities/page/) (if available)
  {% end %}
  {% list.option name: "pages" do %}
    Array of all available pages
  {% end %}
{% end %}


[Page objects](/api/entities/page/) have access to the frontmatter variables for that page:

```erb
The page title is <%= page.title %>
Our brand color hex value is <%= page.data[:brand_colors][:red] %>
```

## Helpers

The following helpers are available to use in your page templates. 

{{ render "methods_list", methods: site.data.page_helpers }}

{{toc}}