---
id: panels-adding
label: Adding Custom Panels
title: Adding Custom Panels
---

<%= render section(id: "overview") do |s| %>
  <% s.with_title "Adding a custom panel", hidden: true %>

  <% s.with_block_prose do %>
    You can add a custom inspector panel using the `Lookbook.add_panel` method
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
        <li>There are <%%= examples.size %> examples in this preview<li>
      </ul>
    </div>
    ```
  <% end %>

  <% s.with_block_note :tip do %>
    Panel partial templates can be located anywhere within your app's `views` directory.
  <% end %>
  
<% end %>

<%= render section(id: "options") do |s| %>
  <% s.with_title "Panel options" %>

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

    All panel option values can be provided either as a **simple static value** or as a **lambda function**. Lambdas receive a single object with data relating to the currently active preview/example. For example:

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