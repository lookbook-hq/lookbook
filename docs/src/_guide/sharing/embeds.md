---
id: embeds
title: Preview Embeds
lookbook_embeds: true
---

<%= render section(overview: true) do |s| %>
  Lookbook's preview embeds allow **live component previews** to be embedded on external sites or in the host app's templates.

  Each embed is an `iframe` that points to a customised version of the preview inspector, running on your server.
  The embed can be customised to hide/show inspector panels, allow switching between scenarios, and more.
<% end %>

<%= render section("Example embed", id: "example") do |s| %>
  <% s.with_block_prose do %>
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
   <details>
      <summary>Embed code</summary>
      <%= code :html do %>
        <lookbook-embed
          app="<%= links.v2.demo %>"
          preview="Feedback::BlankSlateComponentPreview"
          scenario="default"
          panels="params,source,output"
          actions="inspect,open"
          param-icon="true">
        </lookbook-embed>
      <% end %>
  <% end %>
<% end %>

<%= render section("Initial setup", id: "setup") do |s| %>
  <% s.with_block_prose do %>
    There are a few steps that will need to be undertaken before preview embeds can be used.
  <% end %>

  <% s.with_block_subheading "Enable Lookbook in production", id: "production", step: 1 %>
  <% s.with_block_prose do %>
    Lookbook must be running in production (and publically accessible) if embeds are to work, as they must be configured to point to a running Lookbook instance.

    See the docs on [running to production](<%= guide_url :production %>) for more details.
  <% end %>

  <% s.with_block_subheading "Configure the access policy", id: "access", step: 2 %>
  <% s.with_block_prose do %>
    By default, Lookbook will block access to the embed from any external domains.

    Set the `preview_embeds.policy` to `ALLOWALL` to allow access if you are **embedding previews externally**:

    ```rb
    # config/application.rb
    config.lookbook.preview_embeds.policy = "ALLOWALL"
    ```

    If you are hosting embeds on the same domain as the Lookbook instance you do not need to change this value.
  <% end %>

  <% s.with_block_subheading "Include the Lookbook JS", id: "javascript", step: 3 %>
  <% s.with_block_prose do %>
    Every page that has an embed on it will need to include the [Lookbook JS file](<%= links.v2.demo_home %>/lookbook-assets/js/lookbook.js).

    This is served by every app running Lookbook at `/lookbook-assets/js/lookbook.js` and can either be referenced from there directly
    or pulled down and included separately.  
  <% end %>

  <% s.with_block_note :warn do %>
    The Lookbook JS file includes the popular [iFrame Resizer](https://github.com/davidjbradshaw/iframe-resizer) script. If your app already includes this in its JS bundle 
    then you should use a lighter-weight ['core' version](<%= links.v2.demo_home %>/lookbook-assets/js/lookbook.js) of the Lookbook JS that does not have the
    iframe resizer script bundled together with it.

    This script is served by apps running Lookbook at `/lookbook-assets/js/lookbook-core.js`.
  <% end %>
<% end %>

<%= render section("Adding embeds", id: "adding-embeds") do |s| %>
  <% s.with_block_prose do %>
    Once everything is setup, embeds can be added via the `<lookbook-embed>` element, with config options
    for each instance are set via attributes on the tag.
  <% end %>

  <% s.with_block_subheading "Basic embed", id: "basic" %>
  <% s.with_block_prose do %>
    The `app` and `preview` attributes are the only two that are required for a basic embed:

    ```html
    <lookbook-embed
      app="<%= links.v2.demo %>"
      preview="Feedback::AlertComponentPreview">
    </lookbook-embed>
    ```

    <details>
      <summary>Generated embed</summary>
      <lookbook-embed
        app="<%= links.v2.demo %>"
        preview="Feedback::AlertComponentPreview">
      </lookbook-embed>
    </details>

    * `app`: The **root URL** of the parent Lookbook instance
    * `preview`: The full class name of the target preview class.
  <% end %>
  <% s.with_block_note :tip do %>
    If the embed is on the same domain as the Lookbook instance **and** Lookbook is mounted at the standard path (`/lookbook`)
    then the `app` attribute can be omitted, otherwise it is required.
  <% end %>

  <% s.with_block_subheading "Scenarios", id: "scenarios" %>
  <% s.with_block_prose do %>
    By default the preview will render the **first** scenario defined in the preview class.
    To specify a particular scenario, add the `scenario` attribute with the target scenario (method) name:

    ```html
    <lookbook-embed scenario="danger" ...>
    ```

    <details>
      <summary>Generated embed</summary>
      <lookbook-embed
        app="<%= links.v2.demo %>"
        preview="Feedback::AlertComponentPreview"
        scenario="danger">
      </lookbook-embed>
    </details>

    Providing a comma-separated list of scenario names will add a 'scenario switcher' to the embed to allow users to
    navigate between scenarios:

    ```html
    <lookbook-embed scenario="success,danger" ...>
    ```

    <details>
      <summary>Generated embed</summary>
      <lookbook-embed
        app="<%= links.v2.demo %>"
        preview="Feedback::AlertComponentPreview"
        scenario="success,danger">
      </lookbook-embed>
    </details>
  <% end %>
  <% s.with_block_note :tip do %>
    To include _all_ scenarios in the switcher, set the `scenario` attribute value to `*`:
  <% end %>

  <% s.with_block_subheading "Panels", id: "panels" %>
  <% s.with_block_prose do %>
    By default, none of the preview [inspector panels](<%= guide_url :concepts %>) are displayed in the embed.
    To show one or more panels, provide a comma-separated list of panel names as the `panels` attribute value:

    ```html
    <lookbook-embed panels="source,params" ...>
    ```

    <details>
      <summary>Generated embed</summary>
      <lookbook-embed
        app="<%= links.v2.demo %>"
        preview="Feedback::BlankSlateComponentPreview"
        panels="source,params">
      </lookbook-embed>
    </details>
 
  <% end %>
  <% s.with_block_note :tip do %>
    Note that the wildcard character `*` can be used to represent 'all other panels'. 

    ```html
    panels="*" <!-- show all panels, including any custom ones -->
    panels="notes,source,*" <!-- show notes, then source, then all other panels -->
    ```
  <% end %>
  <% s.with_block_data_list title: "Available panels:", data: site.data.inspector_panels %>

  <% s.with_block_subheading "Actions", id: "actions" %>
  <% s.with_block_prose do %>
    'Action' buttons are displayed in the right-hand side of the embed header and are specified via the `actions` attribute as a
    comma-separated list of names:

    ```html
    <lookbook-embed actions="open" ...>
    ```

    <details>
      <summary>Generated embed</summary>
      <lookbook-embed
        app="<%= links.v2.demo %>"
        preview="Feedback::AlertComponentPreview"
        actions="open">
      </lookbook-embed>
    </details>

  <% end %>
  <% s.with_block_data_list title: "Available actions:", data: site.data.embed_actions %>

  <% s.with_block_subheading "Params", id: "params" %>
  <% s.with_block_prose do %>
    If the preview has been set up to make use of [preview parameters](<%= guide_url :previews %>#parameters) (with or without [param fields](<%= guide_url :previews_params %>))
    then parameter values can be passed to the embed.

    To set an intial value for a preview parameter, use an attribute in the format `param-<param-name>="<param-value>"`.

    ```html
    <lookbook-embed param-text="Some custom button text" ...>
    ```

    <details>
      <summary>Generated embed</summary>
      <lookbook-embed
        app="<%= links.v2.demo %>"
        preview="Elements::ButtonComponentPreview"
        param-text="Some custom button text">
      </lookbook-embed>
    </details>
  <% end %>
<% end %>

<%= render section("Default values", id: "defaults") do |s| %>
  <% s.with_block_prose do %>
    You can specify default values for the `panels` and `actions` options when [configuring Lookbook](<%= guide_url :configuration %>):

    ```rb
    # config/application.rb
    config.lookbook.preview_embeds.panels = ["notes", "source"]
    config.lookbook.preview_embeds.actions = ["inspect"]
    ```
    
    Once set, only embeds that wish to override the defaults need specify these as attributes.
  <% end %>
<% end %>