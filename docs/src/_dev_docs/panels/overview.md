---
id: panels-overview
label: Overview
title: Overview
---

<%= render section(overview: true) do |s| %>
  You can extend Lookbook's preview experience to better match your projects requirements by adding
  **custom inspector panels** to display data about the current preview.
<% end %>

<%= render section("Adding panels", id: "options") do |s| %>
  <% s.with_block_prose do %>
    Custom inspector panels can be added using the `Lookbook.add_panel` method
    when you [configure your Lookbook installation](<%= guide_url :configuration %>):
  <% end %>

  <% s.with_block_api_method "Lookbook", :add_panel, show: [:params] %>
  
  <% s.with_block_prose do %>
    For example, a very simple 'info' panel could be created as follows:

    ```ruby
    Lookbook.add_panel(:info, "panels/info", {
      label: "Extra Info"
    })
    ```

    ```erb
    <!-- app/views/panels/_info.html.erb -->
    <div class="lookbook-panel">
      <h2>Some information</h2>
      <ul>
        <li>You are looking at the '<%%= preview.label %>' preview</li>
        <li>The preview file path is: '<%%= preview.full_path %>'<li>
        <li>There are <%%= scenarios.size %> scenarios in this preview<li>
      </ul>
    </div>
    ```
  <% end %>

  <% s.with_block_note :tip do %>
    Panel partial templates can be located anywhere within your app's `views` directory.
  <% end %>
  
<% end %>

<%= render section("Panel options", id: "options") do |s| %>
  <% s.with_block_prose do %>
    There are a number of available options when defining a panel:
  <% end %>

  <% s.with_block_api_method_options_list "Lookbook", :add_panel %>

  <% s.with_block_prose do %>
    Below is an example of adding a new panel with some options set:

    ```ruby
    Lookbook.add_panel(:info, "path/to/view_partial", {
      label: "New Panel",
      hotkey: "ctrl.n",
      copy: "Content to be copied",
      locals: {
        last_updated: '2022-03-02'
      }
    })
    ```

    All panel option values can be provided either as a **simple static value** or as a **lambda function**. Lambdas receive a single object with data relating to the currently active preview/scenario. For example:

    ```ruby
    {
      # Customise the panel tab label:
      label: "Params",
      # Disable the tab if no params are set for the current preview:
      disabled: ->(data) { data.context.params.none? }
    }
    ```

    The `data` hash provided as the single argument to any lambda functions contains the same objects
    as those that are made available as variables to the panel partial template. See the [panel template variables](<%= extend_url :panels_templates %>#variables) docs for full details.

  <% end %>
<% end %>