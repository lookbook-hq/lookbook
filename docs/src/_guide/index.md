---
id: introduction
label: Introduction
title: Introduction
---

<%= render section("About Lookbook", overview: true) do |s| %>
  <% s.with_block_lede do %>
    **Lookbook is an open source UI development tool that helps you build modular front-end UIs in Ruby on Rails applications.**

    It provides an easy-to-use web interface for **browsing and previewing** UI components in your projects, and helps you **develop,
    test & document** those components in isolation from each other.
  <% end %>

  

   <% s.with_block_prose do %>
    Lookbook was originally designed for [ViewComponent](https://github.com/ViewComponent/view_component)-based projects but now supports
    a [number of other component types](<%= guide_url :components %>) too!
  <% end %>

  <% s.with_block_note :warn, title: "This documentation is for Lookbook v2.0"  do %>
    See the [v1.x](https://lookbook.build) or 
    [v0.9.x](https://github.com/ViewComponent/lookbook/tree/0.9.x) docs if you are using an older version of Lookbook.
  <% end %>
  
<% end %>

<%= render section("Demo app", id: "demo") do |s| %>
  <% s.with_block_prose do %>
    If you want to have a quick play with Lookbook, the easiest way is to [give the demo app](<%= links.v2.demo %>) a spin.
    It's a basic Rails/ViewComponent app with a few test components included to tinker with:
  <% end %>

  <% s.with_block_button center: false do |b| %>
    <% b.with_button "View the Lookbook demo app", href: links.v2.demo, icon: :arrow_right %>
  <% end %>


  <% s.with_block_note :tip do %>
    If you'd rather dig in a bit more and run the demo app locally, the [demo repo](<%= links.v2.demo_repo %>) contains instructions on how to get it up and running yourself.
  <% end %>
  
  <% s.with_block_screenshot "guide/lookbook_ui.png", "Lookbook demo app", href: links.v2.demo %>

<% end %>

<%= render section("Why Lookbook?", id: "why") do |s| %>
  <% s.with_block_prose do %>
    Many other tools similar to Lookbook exist, of which the most notable is probably [Storybook](https://storybook.js.org/).

    Storybook is fantastic, and is perfect for those building UIs with JavaScript frameworks such as Vue or React.
    If that is what you are using, Storybook may well be a better fit than Lookbook for your project.
 
    But Storybook _doesn't_ play so nicely with Rails apps that are using Ruby-based, server-side rendered component frameworks
    (like ViewComponent) for their frontend needs, requiring complex custom setups to get everything working together.
  
    In contrast, Lookbook has been designed to **fit seamlessly into Rails projects** and provides a live, Storybook-esque
    experience when developing user interfaces using ViewComponents, Phlex views or even regular ActionView template partials.
    If that sounds like your app, then Lookbook will hopefully be a great fit for you.
  <% end %>

  <% s.with_block_note :tip do %>
    If you are using ViewComponent and want to evaluate Storybook alongside (or instead of!) Lookbook, then check out
    [ViewComponent Storybook](https://github.com/jonspalmer/view_component_storybook).
    It's designed to help bridge the gap between Rails and Storybook and will make the process a lot easier.
  <% end %>
<% end %>

<%= render section("Who uses Lookbook?", id: "lookbook-users") do |s| %>
  * [Aluuno](https://aluuno.com/)
  * [Clio](https://www.clio.com/)
  * [CoverageBook](https://coveragebook.com/)
  * [FreeAgent](https://www.freeagent.com/)
  * [Gitlab](https://www.gitlab.com/)
  * [GitHub](https://www.github.com/)
  * [Podia](https://www.podia.com/)
  * [Polaris ViewComponents](https://github.com/baoagency/polaris_view_components)
  * [Within3](https://within3.com/)
  * [Wrapbook](https://wrapbook.com/)
  * And [many more...](https://github.com/ViewComponent/lookbook/network/dependents?package_id=UGFja2FnZS0xMDM0MzQ1)

  Using Lookbook? [Send a pull request](https://github.com/ViewComponent/lookbook/edit/main/docs/src/_guide/overview.md) to update this list!
<% end %>

<%= render section("Related content", id: "related") do |s| %>
  * [ViewComponent in the Wild II: supercharging your components](https://evilmartians.com/chronicles/viewcomponent-in-the-wild-supercharging-your-components)
  * [From partials to ViewComponents: writing reusable front-end code in Rails](https://dev.to/nejremeslnici/from-partials-to-viewcomponents-writing-reusable-front-end-code-in-rails-1c9o)
<% end %>
