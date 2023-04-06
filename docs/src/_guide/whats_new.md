---
id: whats-new
label: What's New
title: What's New in v2.0
goals: 
  - icon: layers
    text: "Support for previewing a **range of component types**"
  - icon: plug
    text: "**Preview embeds** for including Lookbook previews on external sites"
  - icon: loader
    text: "Improved **file watching/live updates system** with tighter Rails integration to improve reliability
      and interoperability (including support for forking servers in clustered mode)"
---

<%= render section(overview: true) do |s| %>
  <% s.with_block_prose do %>
    Lookbook v2.0 includes a number of improvements and new features, including:
  <% end %>

  <% s.with_block_html do %>
    <ul class="space-y-4 pl-4">
      <% resource.data.goals.each do |goal| %>
        <li class="flex items-start">
          <div class="flex-none mr-3">
            <%= icon goal["icon"].to_sym, class: "mt-1 text-gray-600" %>
          </div>
          <div>
            <%= markdownify goal.text %>
          </div>
        </li>
      <% end %>
    </ul>
  <% end %>

  <% s.with_block_prose do %>
    This release also includes some naming changes (both in documentation and in code) to help clarify concepts such as preview examples/scenarios
    and to bring Lookbook close in line with other similar tools.

    Finally, this documentation site has been rebuilt and the Ruby API docs are now generated using [YARD](https://yardoc.org/)
    for easier maintence and updates.
  <% end %>

  <% s.with_block_note :warn do %>
    The v2.0 release includes a small number of breaking changes. See the [upgrade guide](<%= guide_url :upgrading %>) for details.
  <% end %>
<% end %>

<%= render section("Preview anything*", id: "component-types") do |s| %>
  <% s.with_block_prose do %>
    While Lookbook still works great with ViewComponent, it is now possible to create previews for **Phlex views** and **ActionView partials** instead of (or alongside!)
    any ViewComponent previews.

    In fact, Lookbook can create previews of **anything that can be rendered using Rails' `render` helper**. All previews will have the same functionality available to them
    (preview params, display opions etc) no matter what the component type.

    [See the component docs for more details &rarr;](<%= guide_url :components %>)

    <p><small class="italic opacity-50">*not quite anything</small></p>
  <% end %>
<% end %>

<%= render section("Preview embeds", id: "preview-embeds") do |s| %>
  <% s.with_block_prose do %>
      Preview embeds allow **live component previews** to be embedded outside of Lookbook, within the parent app or on an external site.

      The following is an example of a full-featured embed of a preview from the [Lookbook demo site](<%= links.v2.demo %>):      
  <% end %>

    <% s.with_block_html do %>
    <lookbook-embed
      app="<%= links.v2.demo %>"
      preview="Feedback::BlankSlateComponentPreview"
      scenario="default"
      panels="params,source,output"
      actions="inspect,open"
      param-icon="true">
    </lookbook-embed>
  <% end %>

  <% s.with_block_prose do %>
    [Read more about preview embeds &rarr;](<%= guide_url :embeds %>)
  <% end %>
  
<% end %>


<%= render section("Better file watching", id: "live-reload") do |s| %>
  <% s.with_block_prose do %>
    Lookbook's file watching system has been completely overhauled and is now much more closely integrated
    with Rails' own change detection/code reloading system.

    This means that some long-standing issues (such as detecting changes on forked servers with multiple processes running) have been resolved
    and the `listen` and `actioncable` gems are now only optional dependencies that can be omitted from production (or entirely!).

    [Read more about setting up file watching after upgrading &rarr;](<%= guide_url :upgrading %>#file-watching)
  <% end %>
<% end %>

