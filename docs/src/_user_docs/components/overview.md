---
id: components
label: Overview
title: Overview
---

<%= render section(overview: true) do |s| %>
  <% s.with_block_prose do %>
    A component is a discrete, reusable 'chunk' of user interface such as a button or alert banner. 

    Lookbook's primary focus is on improving the developer experience of working with server-side rendered components created with
    frameworks such as [ViewComponent](https://viewcomponent.org/) or [Phlex](https://phlex.fun),
    as well as for rendering previews of regular Rails [template partials](https://guides.rubyonrails.org/layouts_and_rendering.html#using-partials).

    It's no problem to have previews for more than one type of component sitting side-by-side in your project - Lookbook will treat them all the same way.
  <% end %>
<% end %>

<%= render section("Integrations") do |s| %>
  <% s.with_block_prose do %>

    See the documentation below for details on using specific component types with Lookbook:

    * [ViewComponents](<%= guide_url :components_view_component %>)
    * [Phlex views](<%= guide_url :components_phlex %>)
    * [ActionView template partials](<%= guide_url :components_partials %>)

  <% end %>
<% end %>


