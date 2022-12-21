---
id: components
label: Components
title: Components Primer
---

<%= render section(id: "overview") do |s| %>
  <% s.with_title "Overview", hidden: true %>

  <% s.with_block_prose do %>
    Lookbook was originally developed to work with [ViewComponent](https://viewcomponent.org) but now supports rendering previews for many different component types.

    Lookbook's definition of a component is pretty broad - it is anything that can be rendered in a view template using the Rails `render` method.

    That means that Lookbook works with ViewComponents, Phlex Views and even plain old Rails template partials.
  <% end %>
<% end %>
