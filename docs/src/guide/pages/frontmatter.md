---
layout: default
title: YAML Frontmatter
---

Pages can use an optional YAML frontmatter block to configure the behaviour of the page and to provide custom data, if required.

Frontmatter blocks are defined at the top of a page and consists of a valid block of YAML sandwiched between triple-dashes:

```markdown
---
title: YAML Frontmatter Example
label: Frontmatter
---
Page content here.
```

## Available options

The following frontmatter options are available for each page:

{%= options_list do |list| %}
  {% list.option name: "id", type: "String" do %}
    A custom page ID that can be used for linking to it from other pages
  {% end %}
  {% list.option name: "label", type: "String" do %}
    The name of the page that will be displayed in the navigation (auto-generated from the file name if not set)
  {% end %}
  {% list.option name: "title", type: "String" do %}
    The main page title displayed on the page (defaults to the label value if not set).
  {% end %}
  {% list.option name: "hidden", type: "Boolean" do %}
    If `false` the page will not appear in the navigation but will still be accessible at it's URL (useful for pages that are still in development)
  {% end %}
  {% list.option name: "landing", type: "Boolean", default: "false" do %}
    Set to `true` to use the page as the Lookbook landing page
  {% end %}
  {% list.option name: "header", type: "Boolean", default: "true" do %}
    Set to `false` to hide the page header containing the page title
  {% end %}
  {% list.option name: "footer", type: "Boolean", default: "true" do %}
    Set to `false` to hide the page footer containing the previous/next page links
  {% end %}
  {% list.option name: "data", type: "Hash", default: "{}" do %}
    Optional hash of custom data to make available for use in the page - see info on <a href="/guide/pages/variables">page variables & data</a>.
  {% end %}
{% end %}


## Default values

You can set global default values for page options in the application configuration:

```ruby
# config/application.rb
config.lookbook.page_options = {
  footer: false,
  data: {
    brand_colors: {
      red: '#ff0000'
    }
  }
}
```

These will be merged with any page-level frontmatter data. Options set in the frontmatter will override those set at the global level (apart from `data`, which will be deep-merged with the any globally defined data).

{{toc}}
