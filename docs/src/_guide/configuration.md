---
id: configuration
label: Configuration
title: Configuring Lookbook
---

<%= render section("Configuring Lookbook", id: "overview") do |s| %>
  Lookbook can be configured in your main `application.rb` file, an environment-specific config file or anywhere else you would normally handle your Rails app configuration.

  All Lookbook config options are set on the `config.lookbook` object. For example:

  ```ruby
  # config/environments/development.rb
  Rails.application.configure do
    # other app config...
    config.lookbook.project_name = "Lookbook Demo"
  end
  ```
<% end %>

<%= render section(id: "options") do |s| %>
  <% s.with_title "Available options" %>

  You can find full details of all available configuration options on the [config reference](<%= guide_url(:config_reference) %>) page.
<% end %>
