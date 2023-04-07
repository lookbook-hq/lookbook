---
id: upgrading
label: Upgrading
title: Upgrade Guide
---

<%= render section(overview: true) do |s| %>
  For most projects upgrading from Lookbook v1.x to v2.x will not require any code updates.

  However there are a small number of breaking changes in v2.0 which may need some attention. These are detailed below:
<% end %>

<%= render section("File watching & dependencies", id: "file-watching") do |s| %>
  <% s.with_block_prose do %>
    Lookbook now uses Rails' native file watching system to detect changes when running in development.

    Because of this the `listen` and `actioncable` gems are now optional dependencies and are no longer bundled with Lookbook.

    Apps that do not include these gems in their Gemfile will **no longer see live updates** to the Lookbook UI after changing files - a manual refresh of the page will be required.

    To enable live UI updates in development, add the `listen` and `actioncable` gems to the `development` group (if your app does already include them elsewhere):

    ```ruby
    # Gemfile
    group :development do
      gem "listen"
      gem "actioncable"
    end
    ```
  <% end %>
<% end %>

<%= render section("'Examples' are now 'scenarios'", id: "examples-scenarios") do |s| %>
  <% s.with_block_prose do %>
    Methods within preview classes are now referred to as `scenarios` instead of `examples` - both [in code](<%= api_url :preview_entity %>) and [in documentation](<%= guide_url :concepts %>).

    Variables and method names have been renamed accordingly, and the use of `example`/`examples` has been deprecated and will be removed in Lookbook `3.0`.
    
    Any custom panel templates or code that uses Lookbook's Ruby API should be updated to reflect the naming change.
  <% end %>
<% end %>

<%= render section("Preview group rendering", id: "preview-group") do |s| %>
  <% s.with_block_prose do %>
    The view template used to render grouped scenarios together in a single preview has moved from `lookbook/preview.html.erb` to `lookbook/previews/group.html.erb`.

    Apps that have [customised the rendering of preview groups](<%= guide_url :previews_groups %>#customising) by placing an amended version of this template in their `views` directory will need to move it to match the new path.
  <% end %>
<% end %>

<%= render section("Panel positions", id: "panel-positions") do |s| %>
  <% s.with_block_prose do %>
    It is no longer possible to provide a `position` option when adding custom inspector panels.

    Which inspector panels to show (and what order they should be displayed in) is now set using the `preview_inspector.drawer_panels` config option. [Read more &rarr;](<%= guide_url :config_reference %>#preview_inspector.drawer_panels)
  <% end %>
<% end %>

<%= render section("API changes", id: "api-changes") do |s| %>
  <% s.with_block_prose do %>
    Lookbook's 'entity' classes have been renamed. This is unlikely to affect users directly but is documented here for completeness:

    * `Preview` -> `PreviewEntity`
    * `PreviewExample` -> `ScenarioEntity`
    * `PreviewGroup` -> `ScenarioGroupEntity`
    * `RenderedExample` -> `RenderedScenarioEntity`
    * `Page` -> `PageEntity`
    * `Component` -> `RenderableEntity`

    A number of method names have also been changed (e.g. see the note on examples/scenarios [above](#examples-scenarios)).
    Aliases have been put in place with deprecation warnings where this has been done.
  <% end %>
<% end %>

<%= render section("Rake tasks", id: "rake") do |s| %>
  <% s.with_block_prose do %>
    The `lookbook:previews:preparse` rake task (previously deprecated as no longer required) has been removed.
  <% end %>
<% end %>

<%= render section("Workbench", id: "workbench") do |s| %>
  <% s.with_block_prose do %>
    The 'workbench' app (previously run via the `bin/workbench` command) has been removed to reduce the maintence overhead of managing an additional separate app within the codebase.

    It's recommended to use the [Lookbook demo app](<%= links.demo_repo %>) set up to reference a local copy of the Lookbook gem for testing the development of new features.
  <% end %>
<% end %>


