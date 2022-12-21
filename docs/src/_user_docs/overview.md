---
id: overview
label: Overview
title: Lookbook Overview
---

<%= render section(id: "overview") do |s| %>
  <% s.with_title  "About Lookbook", hidden: true %>

  <% s.with_block_lede do %>
    <p class="font-semibold">Lookbook is a UI tool to help build component-based frontends in Rails.</p>

    It lets you browse your component library and develop, test, document & share components in isolation, right from within your project.
  <% end %>

  <% s.with_block_note :info, title: "This documentation is for Lookbook v2.0"  do %>
    See the [v1.x docs](https://lookbook.build) or the
    [v0.9.x docs](https://github.com/ViewComponent/lookbook/tree/0.9.x) if you are using an older version of Lookbook.
  <% end %>
<% end %>

<%= render section("Lookbook vs the alternatives", id: "alternatives") do |s| %>
  Many other tools similar to Lookbook exist, of which the most notable is probably [Storybook](https://storybook.js.org/).

  Storybook is fantastic, and is perfect for those building UIs with JavaScript frameworks such as Vue or React.
  If that is what you are using, Storybook will likely be a better fit than Lookbook for your project.

  But Storybook _doesn't_ play so nicely with Rails apps that are using non 'JavaScript-first' component frameworks
  (like ViewComponent) for their frontend needs, requiring complex custom setups or continous exporting of JSON files
  to get everything working together.

  In contrast, Lookbook has been designed fit seamlessly into Rails projects and provides a live Storybook-like
  experience when developing user interfaces in "The Rails Way&trade;".
  If that sounds like your project, Lookbook will be a great fit for you.
<% end %>

<%= render section("Demo app", id: "demo") do |s| %>
  <% s.with_block_prose do %>
    If you want to have a quick play with Lookbook, the easiest way is to [give the demo app](<%= links.v2.demo %>) a spin.
    It's a basic Rails/ViewComponent app with a few test components included to tinker with.
  <% end %>

  <% s.with_block_button do |b| %>
    <% b.with_button "Lookbook Demo", href: links.v2.demo, icon: :arrow_right %>
  <% end %>

  <% s.with_block_prose do %>
    If you'd rather dig in a bit more and run the demo app locally, the [demo repo](<%= links.v2.demo_repo %>) contains instructions on how to get it up and running.
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

  Using Lookbook? [Send a pull request](https://github.com/ViewComponent/lookbook/edit/main/docs/src/_user_docs/overview.md) to update this list!
<% end %>

<%= render section("Related content", id: "related") do |s| %>
  * [ViewComponent in the Wild II: supercharging your components](https://evilmartians.com/chronicles/viewcomponent-in-the-wild-supercharging-your-components)
  * [From partials to ViewComponents: writing reusable front-end code in Rails](https://dev.to/nejremeslnici/from-partials-to-viewcomponents-writing-reusable-front-end-code-in-rails-1c9o)
<% end %>
