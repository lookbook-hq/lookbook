---
id: installation
label: Installation
title: Installing Lookbook
---

<%= render section(overview: true) do |s| %>
  These instructions cover installing Lookbook in your Rails project for the first time.

  If you are already using Lookbook then head over to the [upgrade guide](<%= guide_url :upgrading %>) instead
  for details on how to update your project to the latest version. 
<% end %>

<%= render section("Installation", id: "install") do |s| %>
  <% s.with_block_prose do %>
    Follow the steps below to add Lookbook to your project.
  <% end %>

  <% s.with_block_subheading "Add the gem", id: "step-1", step: 1 %>

  <% s.with_block_prose do %>  
    Add `lookbook` to your `Gemfile`:

    ```ruby
    group :development do
      gem "lookbook", ">= <%= lookbook_version %>"
    end
    ```

    And then `bundle install` to install Lookbook.
  <% end %>

  <% s.with_block_note :tip do %>
    Lookbook can also be run in production - see [the docs for details](<%= guide_url :production %>) on how to set that up.
  <% end %>

  <% s.with_block_subheading "Mount the Lookbook engine", id: "step-2", step: 2 %>

  <% s.with_block_prose do %>  
    Next mount Lookbook at a path of your choosing in your `config/routes.rb` file:

    ```ruby
    Rails.application.routes.draw do
      if Rails.env.development?
        mount Lookbook::Engine, at: "/lookbook"
      end
    end
    ```

    The mount path (`/lookbook` in the example above) will be the URL that the Lookbook UI will be made accessible at within your app.
  <% end %>

  <% s.with_block_subheading "Enable live UI updates", id: "step-3", step: 3 %>

  <% s.with_block_prose do %>
    Lookbook requires the `listen` and `actioncable` gems to enable live-updating of the UI when changes are made to component or preview files.

    These are **optional dependencies** - if they are not present the only difference is that you will need to manually refresh the Lookbook UI to see any changes that you have made.

    Many Rails apps already include these gems. If your project doesn't you can enable Lookbook live UI updates by including them in the `:development` group in your `Gemfile`:

    ```ruby
    group :development do
      gem "listen"
      gem "actioncable"
    end
    ```

    No additional configuration is needed once they are installed - Lookbook will detect they are present and enable live updates automatically.
  <% end %>

  <% end %>

<%= render section("Get Started", id: "get-started") do |s| %>
  Once everything is installed, start your app as normal.

  Assuming your app is running on port `3000` and you mounted Lookbook at the path `/lookbook` then browse to [http://localhost:3000/lookbook](http://localhost:3000/lookbook) to view the Lookbook UI.

  If this is a new project it will be pretty empty in there until you start [creating some components](<%= guide_url :key_concepts %>#components)
  and adding some [preview classes](<%= guide_url :key_concepts %>#previews).
<% end %>

