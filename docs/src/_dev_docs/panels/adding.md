---
id: panels-adding
label: Add a Custom Panel
title: Adding a Custom Panel
---

<%= prose "Adding a custom panel", "adding", heading: {hidden: true} do %>
You can add a custom inspector panel using the `Lookbook.add_panel` method when you configure your Lookbook installation:
<% end %>

<%= method_docs "Lookbook", :add_panel, description: false %>

<%= prose do %>

For example, a very simple 'info' panel could be created as follows:

```ruby
# config/application.rb
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

<%= note :tip do %>
  Panel partial templates can be located anywhere within your app's `views` directory.
<% end %>
<% end %>

<%= prose "Panel options", "options" do %>

There are a number of available options when defining a panel:

<%= method_params_list "Lookbook", :add_panel, only: :opts %>

Below is an example of adding a new panel with a number of options set:

```ruby
Lookbook.add_panel(:info, "path/to/view_partial", {
  label: "New Panel",
  hotkey: "ctrl.n",
  disabled: false,
  show: true,
  copy: "Content to be copied",
  locals: {
    last_updated: '2022-03-02'
  }
})
```

All panel option values can be provided either as a **simple static value** or as a **lambda function**. Lambdas receive a single object with data relating to the currently active preview/example. For example:

```ruby
{
  label: "Params",
  disabled: ->(data) { data.context.params.none? } # grey out the Params tab if no params are set for the current preview
}
```

The `data` hash provided as the single argument to any lambda functions contains the [same set of objects](<%= extend_url :panels_templates %>)
that are provided to the panel partial template ([see the panel template](<%= extend_url :panels_templates %>) docs for full details).

<%= render LookbookDocs::ParamsList::Component.new do |list| %>
  <%# list.with_param  %>
<% end %>

<% end %>

