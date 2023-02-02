---
id: data
label: Global Data Store
title: Global Data Store
---

<%= render section(overview: true) do %>
  Lookbook provides a global `Lookbook.data` object that can be used for storing arbitrary
  custom data that can then be used in [preview layout templates](<%= guide_url :previews_layouts %>)
  and [custom inspector panels](<%= extend_url :panels_templates %>).
<% end %>

<%= render section("Setting data", id: "setting") do %>
  Data can be set pretty much anywhere in your application, although usually this will be when [configuring your Lookbook installation](<%= guide_url :configuration %>).

  ```rb
  # Set individual property:
  Lookbook.data.company_name = "My Company"

  # Override entire data store:
  Lookbook.data = {
    company_name: "My Company",
    project_github: "https://github.com/my-company/this-project"
  }
  ```

  Both dot-notation and regular hash getter/setter syntax are supported for getting and setting properties on the `data` object.
  Hash keys can either be strings or symbols.

  ```rb
  # All the following statements are equivalent:
  Lookbook.data.company_name = "My Company"
  Lookbook.data[:company_name] = "My Company"
  Lookbook.data["company_name"] = "My Company"
  ```
<% end %>

<%= render section("Hook callbacks", id: "hook-callbacks") do %>
  The data object can be accessed in [lifecycle hooks](<%= extend_url :hooks %>) in order to capture information about
  the current Lookbook state, or the results of some custom processing.

  All hook callback blocks are yielded the main [`Lookbook` application object](<%= api_module_url "Lookbook" %>)
  as their first argument, so data can be set on it as follows:

  ```rb
  Lookbook.after_change do |app, changes|
    app.data.last_changed_files = changes[:modified].presence || [] 
  end
  ```
<% end %>

<%= render section("Using in preview layouts", id: "preview-layouts") do %>
  Custom data can be accessed in [preview layout templates](<%= guide_url :previews_layouts %>) via the `params` object:

  ```erb
  <!-- app/views/layouts/preview.html.erb -->
  ...
  <div><%%= yield %></div>
  <p>Built by <%%= params[:lookbook][:data][:company_name] %></p>
  ...
  ```

  _Note that accessing data using dot-notation syntax is not supported in preview templates
  However the Lookbook [preview helper](<%= api_module_url "PreviewHelper" %>) can be used to make things
  less verbose if desired._
<% end %>

<%= render section("Using in custom Panels", id: "custom-panels") do %>
  [Custom panel templates](<%= extend_url :panels_templates %>) have access to the Lookbook.data object via the local `data` variable:

  ```erb
  <!-- app/views/panels/modified.html.erb -->
  <h1>Last modified files:</h1>
  <ul>
    <%% data.last_changed_files.each do |path| %>
      <li><%%= path %></li>
    <%% end %>
  </ul>
  ```
<% end %>