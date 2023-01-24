---
id: production
label: Running in Production
title: Running in Production
---

<%= render section(overview: true) do |s| %>
  Lookbook does not require any configuration changes to run in production. However it must be set up correctly so that it is loaded in both development and production environments.
<% end %>

<%= render section("Setup adjustments", id: "setup") do |s| %>
  <% s.with_block_subheading "Add gem to production group", id: "step-1", step: 1 %>
  <% s.with_block_prose do %>  
    Ensure Lookbook is added to the `production` group in your `Gemfile`.

    ```ruby
    # Gemfile
    group :development, :production do
      gem "lookbook"
    end
    ```
  <% end %>

  <% s.with_block_subheading "Mount the engine", id: "step-2", step: 2 %>
  <% s.with_block_prose do %>
    The [installation instructions](<%= guide_url :installation %>#step-2) include a check that the app is running in `development` before
    mounting the Lookbook engine. This code will need to be removed to run Lookbook in production.

    ```ruby
    # config/routes.rb
    Rails.application.routes.draw do
      # if Rails.env.development? <-- remove
        mount Lookbook::Engine, at: "/lookbook"
      # end <-- remove
    end
    ```
  <% end %>
<% end %>

<%= render section("Watching for changes", id: "watching") do |s| %>
  <% s.with_block_prose do %> 
    File watching is disabled in production.

    If using the `actioncable` and `listen` gems in development to enable [live reloading](<%= guide_url :installation %>#step-3), these can be omitted from the `production` gem group.
  <% end %>
<% end %>