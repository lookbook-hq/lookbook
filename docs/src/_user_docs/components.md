---
id: components
label: Components
title: Components
---

<%= render section(overview: true) do |s| %>
  <% s.with_block_prose do %>
    A component is a discrete, reusable 'chunk' of user interface such as a button or alert banner. 

    Components can be client-side or server-side rendered. Lookbook's primary focus is on improving the 
    developer experience of working with the latter.

    It's possible to create a basic component library in Rails apps using just a set of template partials but many
    apps are now turning to specialized component frameworks such as [ViewComponent](https://viewcomponent.org) to base their
    components on.
  <% end %>
<% end %>

<%= render section("Supported component types", id: "types") do |s| %>
  <% s.with_block_prose do %>
    Lookbook was originally developed to work with the excellent [ViewComponent](https://viewcomponent.org) framework,
    but now supports rendering previews for a number of of other component types too.

    Lookbook's definition of a component is pretty broad.
    If the type of component you are using can be rendered in a view template via the Rails `render` method
    (i.e. the component class implements the `render_in` method), then Lookbook should be able to preview them.

    That means that Lookbook works great with:
    
    * [ViewComponent](https://viewcomponent.org)
    * [Phlex](https://phlex.fun) views
    * Regular Rails [template partials](https://guides.rubyonrails.org/layouts_and_rendering.html#using-partials)
    * And more...?

    It's no problem to have previews for more than one type of component sitting side-by-side in your project. Lookbook will treat them all the same way, which
    can be useful when transitioning from (for example) a legacy partial-based component system to a ViewComponent-based one.
  <% end %>
<% end %>

<% if false %>
<%= render section("Component frameworks integrations", id: "frameworks") do |s| %>
  <% s.with_block_prose do %>
    
  <% end %>

  <% s.with_block_subheading("ActionView", id: "action-view") %>

  <% s.with_block_prose do %>
  <% end %>
<% end %>
<% end %>
